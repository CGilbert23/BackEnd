const methods = {};
const { queryInstance } = require("../db/connection");

methods.getSummary = async (req, res) => {
  try {
    const summary = await queryInstance('SELECT * from summary');
    res.json({ summary });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
