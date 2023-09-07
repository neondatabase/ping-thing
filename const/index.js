import { theme } from '../utils/theme';
import { hexToRgb } from '../utils/hex-to-rgb';

export const POINT_RADIUS_LG = 1;
export const POINT_RADIUS_SM = 0.5;
export const POINT_ALTITUDE = 0.02;

const RING_MAX_RADIUS = 20;
const RING_PROPERGATION_SPEED = 4;
const RING_REPEAT_PERIOD = 800;

export const EDGE = 'edge';
export const NEON = 'neon';

export const userPoint = {
  stop: 'You',
  stroke: theme.colors.brand.secondary,
  color: theme.colors.brand.secondary,
};

export const neonPoint = {
  stop: 'Neon Database',
  type: 'end',
  lat: 38.95329973388636,
  lng: -77.45615256400193,
  flag: '🇺🇸',
  region: 'aws-us-east-1',
  stroke: theme.colors.brand.primary,
  color: theme.colors.brand.primary,
  altitude: POINT_ALTITUDE,
  radius: POINT_RADIUS_LG,
  size: 200,
};

export const proxyPoint = {
  stop: 'Neon Proxy',
  type: 'through',
  lat: 38.95329973388636,
  lng: -77.45615256400193,
  flag: '🇺🇸',
  region: 'aws-us-east-1',
  stroke: theme.colors.brand['primary-light'],
  color: theme.colors.brand.background,
  altitude: POINT_ALTITUDE,
  radius: POINT_RADIUS_LG,
  size: 200,
};

export const neonRing = {
  lat: neonPoint.lat,
  lng: neonPoint.lng,
  color: hexToRgb(neonPoint.color),
  maxR: RING_MAX_RADIUS,
  propagationSpeed: RING_PROPERGATION_SPEED,
  repeatPeriod: RING_REPEAT_PERIOD,
};

export const serverlessDriverString = `import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    const response = await sql\`SELECT * FROM table_name\`;

    return Response.json({
      message: 'A Ok!',
      data: response
    });
}

export const config = {
    runtime: 'edge',
};`;
