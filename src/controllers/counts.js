const methods = {};
const { queryInstance } = require("../db/connection");

methods.getCounts = async (req, res) => {
  try {
    const counts = await queryInstance('SELECT * from counts');
    res.json({ counts });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
