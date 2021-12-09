const methods = {};
const { validationResult } = require("express-validator");
const { queryInstance } = require("../db/connection");
const { bcryptPassword, getToken, checkPassword } = require("../helpers");

methods.registerUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const user = await queryInstance(`SELECT * from users WHERE email = '${email}'`);

    if (user && user.length > 0) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    const hashPassword = await bcryptPassword(password);

    const userCreate = await queryInstance(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${hashPassword}') RETURNING user_id`);

    const payload = {
      user: {
        id: userCreate[0].user_id,
      },
    };

    const token = await getToken(payload);

    return res.json({ token });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.loginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await queryInstance(`SELECT * from users WHERE email = '${email}'`);
    
    if (user && user.length > 0) {
      const userPassword = user[0].password;
      const isMatch = await checkPassword(password, userPassword);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user[0].user_id,
        },
      };

      const token = await getToken(payload);

      return res.json({ token });
    } else {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

methods.getUser = async (req, res) => {
  try {
    const user_id = req.user.id;
    const user = await queryInstance(`SELECT * from users WHERE user_id = '${user_id}'`);
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send(err.message);
  }
};

module.exports = methods;
