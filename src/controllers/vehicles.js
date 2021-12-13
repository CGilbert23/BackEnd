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
    const vehicle_id = req.params.vehicle_id;
    const from_dept_id = req.params.from_dept_id;
    const to_dept_id = req.params.to_dept_id;
    const count = req.params.count;
    const vehicles = await queryInstance(`UPDATE vehicles SET dept_id = '${to_dept_id}', date_in = '${new Date().toISOString()}' WHERE vehicle_id = '${vehicle_id}'`);
    const days = await queryInstance(`Select days from counts WHERE dept_id = '${from_dept_id}' AND vehicle_id = '${vehicle_id}'`);
    if(days && days.length === 0) {
      await queryInstance(`INSERT INTO counts (dept_id, vehicle_id, days) VALUES ('${from_dept_id}', '${vehicle_id}', '${count}') RETURNING *`);
    }else if(days && days.length > 0) {
      const latestCount = Number(days[0].days) + Number(count);
      await queryInstance(`UPDATE counts SET days = '${latestCount}' WHERE dept_id = '${from_dept_id}' AND vehicle_id = '${vehicle_id}'`);
    }
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
