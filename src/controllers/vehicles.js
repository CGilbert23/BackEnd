const methods = {};
const { validationResult } = require("express-validator");
const { queryInstance } = require("../db/connection");

methods.getVehicles = async (req, res) => {
  try {
    const vehicles = await queryInstance('SELECT * from vehicles JOIN departments ON departments.dept_id = vehicles.dept_id');
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.updateVehicles = async (req, res) => {
  try {
    const { vehicle_id, to_dept_id } = req.params;
    const vehicles = await queryInstance(`UPDATE vehicles SET dept_id = '${to_dept_id}', date_in = '${new Date().toISOString()}' WHERE vehicle_id = '${vehicle_id}'`);
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.addVehicle = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { dept_id, stock, year, make, model, date_in } = req.body;

  try {
    const vehicles = await queryInstance(`INSERT INTO vehicles (dept_id, stock, year, make, model, date_in, variant, notes) VALUES ('${dept_id}', '${stock}', '${year}', '${make}', '${model}', '${date_in}', 'Variant', 'Out with Driver') RETURNING *`);
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.deleteVehicle = async (req, res) => {
  try {
    const vehicle_id = req.params.vehicle_id;
    const vehicles = await queryInstance(`DELETE FROM vehicles WHERE vehicle_id = '${vehicle_id}' RETURNING *`);
    res.json({ vehicles });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
