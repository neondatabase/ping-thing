import { sql } from '../../neon';

export default async function handler(req) {
  const { id, start_time, end_time, miles, kilometers } = await new Response(
    req.body
  ).json();

  try {
    await sql`UPDATE locations SET start_time = ${start_time}, end_time = ${end_time}, miles = ${miles}, kilometers = ${kilometers} WHERE id = ${id};`;

    return Response.json({
      message: 'Ok',
      status: 200,
    });
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
