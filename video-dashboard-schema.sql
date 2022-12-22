CREATE TABLE users (
    id              SERIAL PRIMARY KEY, 
    name            TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1), 
    password        TEXT NOT NULL, 
    created_at      TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE videos (
    id              SERIAL PRIMARY KEY, 
    user_id         INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    video_title     TEXT NOT NULL,
    video_url       TEXT NOT NULL
);