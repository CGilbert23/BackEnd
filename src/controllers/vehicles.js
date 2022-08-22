const methods = {};
const { validationResult } = require("express-validator");
const { queryInstance } = require("../db/connection");
const { currentDate } = require("../helpers");

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
    const { vehicle_id, from_dept_id, to_dept_id, days } = req.body;
    await queryInstance(`UPDATE vehicles SET dept_id = '${to_dept_id}', date_in = '${currentDate}' WHERE vehicle_id = '${vehicle_id}'`);
    await queryInstance(`INSERT INTO summary (vehicle_id, from_dept_id, to_dept_id, days) VALUES ('${vehicle_id}', '${from_dept_id}', '${to_dept_id}', '${days}') RETURNING *`);
    const existedCount = await queryInstance(`SELECT * from counts WHERE dept_id = '${from_dept_id}'`);
    if(existedCount && existedCount.length > 0) await queryInstance(`UPDATE counts SET days = '${Number(existedCount[0].days) + Number(days)}' WHERE dept_id = '${from_dept_id}'`);
    else await queryInstance(`INSERT INTO counts (dept_id, days) VALUES ('${from_dept_id}', '${days}') RETURNING *`);
    res.json({ result: "Vehicle updated successfully!" });
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
  const { dept_id, stock, year, make, model, ucm_in, date_in } = req.body;
  try {
    const vehicles = await queryInstance(`INSERT INTO vehicles (dept_id, stock, year, make, model, ucm_in, date_in, variant, notes) VALUES ('${dept_id}', '${stock}', '${year}', '${make}', '${model}', '${ucm_in}', '${date_in}', 'Variant', 'Out with Driver') RETURNING *`);
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
    const summary = await queryInstance(`DELETE FROM summary WHERE vehicle_id = '${vehicle_id}' RETURNING *`);
    res.json({ result: { vehicles, summary } });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
