\echo 'Delete and recreate video-dashboard db'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE IF EXISTS video_dashboard;
CREATE DATABASE video_dashboard;
\connect video_dashboard;

\i video-dashboard-schema.sql