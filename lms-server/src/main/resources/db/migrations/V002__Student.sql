CREATE TABLE student(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES account ON DELETE CASCADE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birthdate date NOT NULL,
  address text NOT NULL,
  phone_number text NOT NULL,
  unique(account_id)
);
