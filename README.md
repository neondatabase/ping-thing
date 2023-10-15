<p align="center">
  <a href="http://neon.tech/demos/ping-thing">
    <img alt="Ping Thing" src="http://neon.tech/demos/ping-thing/static/open-graph-image.jpg" />
  </a>
</p>

# Ping Thing

Ping a Neon Serverless Postgres database using a Vercel Edge Function to see the journey your request makes.

🚀 Live Preview: [https://neon.tech/demos/ping-thing](https://neon.tech/demos/ping-thing)

Read more about how this app was made on the Neon blog: [How to use Postgres at the Edge](https://neon.tech/blog/how-to-use-postgres-at-the-edge)

## Getting Started

- Sign up to [Neon](https://neon.tech/).
- Follow our [Create your first project](https://neon.tech/docs/get-started-with-neon/setting-up-a-project) guide.

## Local Development

Install Dependencies.

```
yarn
```

Rename `.env.example` to `.env` and add your Neon database connection string.

```
DATABASE_URL=
```

SQL schema

```
CREATE TABLE locations (
  id            SERIAL PRIMARY KEY,
  date          TIMESTAMP WITH TIME ZONE NOT NULL,
  flag          VARCHAR,
  country       VARCHAR,
  city          VARCHAR,
  lat           DECIMAL,
  lng           DECIMAL,
  runtime       VARCHAR,
  start_time    NUMERIC,
  end_time      NUMERIC,
  miles         DECIMAL (10,2),
  kilometers    DECIMAL (10,2)
);
```

Start development server.

```
yarn dev
```
