const methods = {};
const { queryInstance } = require("../db/connection");

methods.getSummary = async (req, res) => {
  try {

    const counts = await queryInstance(`SELECT dept.dept_id, dept.name, (select array_agg(days) from summary where dept.dept_id = summary.dept_in_id AND summary.dept_out_id IS NOT NULL AND summary.date_out IS NOT NULL AND summary.date_out > current_timestamp - interval '30 day') AS days From departments AS dept`);

    const frontLines = await queryInstance(`SELECT dept.dept_id, dept.name, (select array_agg(EXTRACT(DAY FROM summary.date_in::timestamp - vehicles.ucm_in::timestamp)) FROM vehicles JOIN summary ON summary.vehicle_id = vehicles.vehicle_id where dept.dept_id = summary.dept_in_id AND summary.dept_out_id IS NULL AND summary.date_out IS NULL AND summary.date_in > current_timestamp - interval '30 day') AS days From departments AS dept where name like 'Frontline%'`);

    const depts = await queryInstance('SELECT * from departments');

    var customCounts = depts.map((ele) => {
      const count = counts.find(e => e.dept_id === ele.dept_id);
      return {
        ...ele,
        days: count ? count.days : 0
      }
    })

    customCounts = counts.map((ele) => {
      const frontLine = frontLines.find(e => e.dept_id === ele.dept_id);
      return {
        ...ele,
        ...frontLine
      }
    })

    // res.json({ summary: customCounts.filter(e => !e.name.includes('Frontline')) });
    res.json({ summary : customCounts });

  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
