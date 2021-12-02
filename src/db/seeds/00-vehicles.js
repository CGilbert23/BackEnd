const vehicle_data = require("../fixtures/vehicles")

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex
    .raw("TRUNCATE TABLE vehicles RESTART IDENTITY CASCADE")
    .then(function () {
      // Inserts seed entries
      return knex('vehicles').insert(vehicle_data)
      
    });
};