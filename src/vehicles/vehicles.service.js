const knex = require("../db/connection");

function create(newCar) {
    return knex("vehicles")
      .insert(newCar)
      .returning("*")
      .then((createdRecords) => createdRecords[0]);
  }
  
  function read(vehicle_id) {
    return knex("vehicles").select("*").where({ vehicle_id }).first();
  }
  
  function update(updatedVehicle) {
    return knex("vehicles")
      .select("*")
      .where({ vehicle_id: updatedVehicle.vehicle_id })
      .update(updatedVehicle, "*")
      .then((updatedRecords) => updatedRecords[0]);
  }
  
  function destroy(vehicle_id) {
    return knex("vehicles").where({ vehicle_id }).del();
  } 

  function list() {
    return knex("vehicles").select("*");
  }

module.exports = {
  list,
  create,
  read,
  update,
  delete: destroy,
};