import { getDistance } from 'geolib';

export const getEdgeDistance = (start, end) => {
  return getDistance(start, end);
};
