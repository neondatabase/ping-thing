export const sendGtagEvent = (eventName, properties) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...properties,
  });
};
