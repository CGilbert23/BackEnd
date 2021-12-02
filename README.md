# BackEnd

Crated with Express/Node using a Knex Library to connect to PostgreSQL

1) Link you database
In Knexfile.js - Enter your database connection link

2) Migrate tables onto the database
run "npx knex migrate:latest"

3) Seed the tables with data from db>fixtures.js
run "npx knex seed:run"

*If you want to refresh the database to scratch at any point just..
run "npx knex migrate:rollback"
and then proceed to run steps 2 and 3 again
