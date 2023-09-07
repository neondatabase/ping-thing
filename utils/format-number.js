export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US', {}).format(number);
};
