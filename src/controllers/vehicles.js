const methods = {};
const { validationResult } = require("express-validator");
const { queryInstance } = require("../db/connection");
const { currentDate } = require("../helpers");

methods.getVehicles = async (req, res) => {
  try {
    const vehicles = await queryInstance('SELECT vehicles.*, departments.*,summary.summary_id, summary.date_in, summary.days from vehicles JOIN summary ON summary.vehicle_id = vehicles.vehicle_id JOIN departments ON departments.dept_id = summary.dept_in_id where summary.dept_out_id IS NULL AND summary.date_out IS NULL');

    const fontLines = await queryInstance(`SELECT vehicles.*, departments.*, summary.summary_id, summary.date_in, EXTRACT(DAY FROM summary.date_in::timestamp - vehicles.ucm_in::timestamp) as datedifference FROM vehicles JOIN summary ON summary.vehicle_id = vehicles.vehicle_id JOIN departments ON departments.dept_id = summary.dept_in_id WHERE departments.name = 'Frontline Ready' AND summary.dept_out_id IS NULL GROUP BY vehicles.vehicle_id, departments.dept_id, summary,summary_id`);

    const customVehicles = vehicles.map((ele) => {
      const fontLine = fontLines.find(e => e.vehicle_id === ele.vehicle_id);
      return {
        ...ele,
        days: fontLine ? fontLine.datedifference : 0
      }
    })

    res.json({vehicles : customVehicles});
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.updateVehicles = async (req, res) => {
  try {
    const { vehicle_id, summary_id, to_dept_id, days, current_date } = req.body;

    await queryInstance(`UPDATE summary SET dept_out_id = '${to_dept_id}', date_out = '${current_date}', days = '${days}' WHERE summary_id = '${summary_id}'`);

    await queryInstance(`INSERT INTO summary (vehicle_id, dept_in_id, date_in) VALUES ('${vehicle_id}', '${to_dept_id}', '${current_date}')`);

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
    const vehicles = await queryInstance(`INSERT INTO vehicles (stock, year, make, model, ucm_in, variant, notes) VALUES ('${stock}', '${year}', '${make}', '${model}', '${ucm_in}', 'Variant', 'Out with Driver') RETURNING *`);

    const summary = await queryInstance(`INSERT INTO summary (vehicle_id, dept_in_id, date_in) VALUES ('${vehicles[0].vehicle_id}', '${dept_id}', '${date_in}') RETURNING *`);

    res.json({ vehicles, summary });

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
