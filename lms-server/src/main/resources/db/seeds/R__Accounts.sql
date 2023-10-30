INSERT INTO account
  (id, email, password, role)
VALUES
  ('45106ca6-62b6-4074-98bb-dc39f91597fa', 'admin@lms.com', '$2a$10$eHKwuqa6oeAtMl30aV8sdOxwp2nGJV2123ykZvvO9HqLLP4DUwWnO', 'ADMIN')
ON conflict(id) DO
  UPDATE SET
    email = excluded.email,
    password = excluded.password,
    role = excluded.role;
