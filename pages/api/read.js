import { sql } from '../../neon';

export default async function handler() {
  try {
    const response = await sql('SELECT * FROM locations ORDER BY id DESC');

    return Response.json({
      message: 'A Ok!',
      response,
    });
  } catch (error) {
    return Response.json({
      message: 'Error',
    });
  }
}

export const config = {
  runtime: 'edge',
};
