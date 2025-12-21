import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config'; // Assuming config.js will hold the base URL

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intervalTime = 5000; // 5 seconds

  const fetchTestimonials = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/public_feedback.php`);
      if (response.data.success) {
        setTestimonials(response.data.data);
      } else {
        setError('Failed to fetch testimonials');
      }
    } catch (err) {
      setError('Error fetching testimonials: ' + err.message);
      console.error('Error fetching testimonials:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials]);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials]);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(nextTestimonial, intervalTime);
      return () => clearInterval(interval);
    }
  }, [nextTestimonial, intervalTime, testimonials.length]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            What Our Users Say
          </h2>
          <p className="text-red-500 dark:text-red-400">Error: {error}</p>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
            What Our Users Say
          </h2>
          <p className="text-gray-600 dark:text-gray-300">No testimonials available yet.</p>
        </div>
      </section>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
          What Our Users Say
        </h2>
        <div className="relative w-full max-w-2xl mx-auto bg-white dark:bg-gray-700 p-8 rounded-lg shadow-lg min-h-[200px] flex flex-col justify-center">
          {currentTestimonial.avatar && (
            <img
              src={currentTestimonial.avatar}
              alt={`${currentTestimonial.name}'s avatar`}
              className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
            />
          )}
          <p className="text-gray-600 dark:text-gray-300 text-lg italic mb-4">
            "{currentTestimonial.message}"
          </p>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((star, i) => (
              <svg
                key={i}
                className={`w-5 h-5 ${
                  i < currentTestimonial.rating
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-500'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.695h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.927 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.695l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-gray-800 dark:text-white font-semibold text-xl">
            - {currentTestimonial.name}
          </p>
          {currentTestimonial.title && (
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {currentTestimonial.title}
            </p>
          )}

          {/* Navigation Buttons */}
          {testimonials.length > 1 && (
            <>
              <button
                onClick={prevTestimonial}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-300 focus:outline-none"
                aria-label="Previous testimonial"
              >
                &#10094;
              </button>
              <button
                onClick={nextTestimonial}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 dark:bg-gray-600 p-2 rounded-full shadow-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-300 focus:outline-none"
                aria-label="Next testimonial"
              >
                &#10095;
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

