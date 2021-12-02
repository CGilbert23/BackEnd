const vehiclesService = require("./vehicles.service");

  
  function create(req, res, next) {
    vehiclesService
      .create(req.body)
      .then((data) => res.status(201).json(req.body))
      .catch(next);
  }
  
  function vehicleExists(req, res, next) {
    vehiclesService
      .read(req.params.vehicle_id)
      .then((vehicle) => {
        if (vehicle) {
          res.locals.vehicle = vehicle;
          return next();
        }
        next({ status: 404, message: `Product cannot be found.` });
      })
      .catch(next);
  }

  function update(req, res, next) {
    const updatedVehicle = {
      ...req.body,
      vehicle_id: res.locals.vehicle.vehicle_id,
    };
    vehiclesService
      .update(updatedVehicle)
      .then((data) => res.json({ data }))
      .catch(next);
  }

  function read(req, res) {
    const { vehicle: data } = res.locals;
    res.json({ data });
  }

  function destroy(req, res, next) {
    vehiclesService
      .delete(res.locals.vehicle.vehicle_id)
      .then(() => res.sendStatus(204))
      .catch(next);
  }


  /*list*/
function list(req, res, next) {
    vehiclesService
      .list()
      .then((data) => res.json({ data }))
      .catch(next);
  }

module.exports = {
    list,
  create: [create],
  read: [vehicleExists, read],
  update: [vehicleExists,update],
  delete: [vehicleExists, destroy]
};