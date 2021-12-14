const methods = {};
const { queryInstance } = require("../db/connection");
const { getCombineCounts } = require("../utils");

methods.getDepartments = async (req, res) => {
  try {
    const depts = await queryInstance('SELECT * from departments');
    res.json({ depts });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.getDepartmentsWithCount = async (req, res) => {
  try {
    const counts = await queryInstance('Select * from departments LEFT JOIN counts ON departments.dept_id = counts.dept_id');
    const depts = await queryInstance('Select * from departments');

    let result = [];

    for(let i=0; i < depts.length; i++) {
      let counterArray = getCombineCounts(counts, depts[i].dept_id);
      result.push({
        ...depts[i],
        days: counterArray
      })
    }

    res.json({ counts: result });
  }catch(err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
}

module.exports = methods;
