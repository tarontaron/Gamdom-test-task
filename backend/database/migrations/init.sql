CREATE TABLE IF NOT EXISTS migrations
(
    id         SERIAL PRIMARY KEY                  NOT NULL,
    name       VARCHAR(255)                        NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE user_role AS ENUM ('admin', 'user');

CREATE TABLE IF NOT EXISTS users
(
    id         SERIAL PRIMARY KEY                  NOT NULL,
    name       VARCHAR(255)                        NOT NULL,
    email      VARCHAR(255) UNIQUE                 NOT NULL,
    password   VARCHAR(255)                        NOT NULL,
    role       user_role                           NOT NULL DEFAULT 'user',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS events
(
    event_id   SERIAL PRIMARY KEY                  NOT NULL,
    event_name VARCHAR(255)                        NOT NULL,
    odds       NUMERIC(5, 2)                       NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    deleted_at TIMESTAMP
);
