const methods = {};
const { queryInstance } = require("../db/connection");

methods.getSummary = async (req, res) => {
  try {
    const counts = await queryInstance('SELECT * from counts');
    const depts = await queryInstance('SELECT * from departments');
    const customCounts = depts.map((ele) => {
      const count = counts.find(e => e.dept_id === ele.dept_id);
      return {
        ...ele,
        days: count ? count.days : 0
      }
    })
    res.json({ summary: customCounts.filter(e => !e.name.includes('Frontline')) });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.resetSummary = async (req, res) => {
  try {
    await queryInstance('DELETE from summary');
    await queryInstance('DELETE from counts');
    res.json({ result: 'Reset summary successfully!' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
