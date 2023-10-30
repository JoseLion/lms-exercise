CREATE EXTENSION pgcrypto;

CREATE type role_enum AS enum('ADMIN', 'STUDENT');

CREATE cast(varchar AS role_enum) with INOUT as IMPLICIT;

CREATE TABLE account(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  password text,
  role role_enum NOT NULL,
  unique(email)
);
