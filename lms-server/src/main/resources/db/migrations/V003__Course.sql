CREATE TABLE course(
  id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  duration numeric NOT NULL,
  unique(name)
);
