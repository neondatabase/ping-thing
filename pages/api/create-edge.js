import { sql } from '../../neon';
import { geolocation } from '@vercel/edge';

export default async function handler(req) {
  // https://github.com/orgs/vercel/discussions/78
  const { date } = await new Response(req.body).json();

  const { country, city, latitude, longitude, flag } = geolocation(req);

  const lat = Number(latitude);
  const lng = Number(longitude);

  try {
    if (!city) {
      return Response.json({
        message: 'A Ok!',
        status: 200,
        id: 123,
        flag: '🇦🇺',
        country: 'AU',
        city: 'Uluru',
        lat: -25.34449,
        lng: 131.0369,
      });
    } else {
      const city_sanitized = city.replace(/[^a-zA-Z ]/g, ' ');

      const response = await sql(
        'INSERT INTO locations(date, flag, country, city, lat, lng, runtime) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
        [date, flag, country, city_sanitized, lat, lng, 'Edge']
      );

      return Response.json({
        message: 'Ok',
        status: 200,
        id: response[0].id,
        flag: flag,
        country: country,
        city: city_sanitized,
        lat: lat,
        lng: lng,
      });
    }
  } catch (error) {
    return Response.json({
      message: 'Error',
      status: 500,
    });
  }
}

export const config = {
  runtime: 'edge',
};
