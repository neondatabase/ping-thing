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


TRUNCATE TABLE locations;