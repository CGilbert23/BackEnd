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

methods.getDepartmentsWithCount = async (req, res) => {
  try {
    const counts = await queryInstance('Select * from departments LEFT JOIN counts ON departments.dept_id = counts.dept_id');

    const isFound = (item) => {
      return item.dept_id
    }
    
    const getTotalDays = (item) => {
      return item.days
    }

    const addDays = (runningTotal, days) => {
      return Number(runningTotal) + Number(days);
  }

  const foundDays = counts.filter(isFound);

  const DaysCount = foundDays.map(getTotalDays);

  const daysTotal = DaysCount.reduce(addDays, 0);

  const averageDays = daysTotal / DaysCount.length;

  const allDays = Object.assign({}, ...foundDays)
  allDays['days'] = averageDays


  const updatedData = counts.map(obj => [allDays].find(o => o.dept_id === obj.dept_id) || obj) 

  let dupChars = updatedData.filter((c, index) => {
    return updatedData.indexOf(c) === index;
});
    res.json({ counts: dupChars });
  }catch(err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
}

module.exports = methods;
