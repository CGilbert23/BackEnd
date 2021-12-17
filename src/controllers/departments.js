const methods = {};
const { queryInstance } = require("../db/connection");

methods.getDepartments = async (req, res) => {
  try {
    const depts = await queryInstance('SELECT * from departments');
    res.json({ depts });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
