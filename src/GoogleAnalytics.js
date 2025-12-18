import ReactGA from "react-ga4";

// Replace with your GA Measurement ID
const GA_TRACKING_ID = "G-CV9VR57THV";

export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logEvent = (category, action, label) => {
  ReactGA.event({
    category,
    action,
    label,
  });
};