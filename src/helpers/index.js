const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const moment = require("moment");

const bcryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const bcryptedPassword = await bcrypt.hash(password, salt);
  return bcryptedPassword;
};

const checkPassword = async (inputPassword, dbPassword) => {
  const match = await bcrypt.compare(inputPassword, dbPassword);
  return match;
};

const getToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 1440000 },
      (err, token) => {
        if (err) throw err;
        resolve(token);
      }
    );
  });
};

const currentDate = new Date().toISOString();

const parseDate = (date) => {
    return moment(date).format('LL');
}

const parseISO = (date) => {
    return moment(date).toISOString()
}

const dateDifference = (date_in) => {
    return moment(currentDate).diff(moment(date_in), 'days');
}

module.exports = { bcryptPassword, getToken, checkPassword, currentDate, parseDate, dateDifference, parseISO };
