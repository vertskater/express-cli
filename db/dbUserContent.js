export const generateDbUserContent = () => {
  return `
  const pgPool = require("./database");
  const User = require("./models/User");
  
  module.exports = {
    postNewUser: async (user) => {
      await pgPool.query(
        "INSERT INTO users (forename, lastname, email, password) VALUES($1, $2, $3, $4)",
        [user.forename, user.lastname, user.email, user.password]
      );
    },
    getUserCredentials: async (email) => {
      const { rows } = await pgPool.query(
        "SELECT id, email, password FROM users WHERE email=$1",
        [email]
      );
      return rows[0];
    },
    getUserById: async (id) => {
      const { rows } = await pgPool.query(
        "SELECT *, r.role FROM users as u JOIN roles as r ON u.role=r.id WHERE u.id=$1",
        [id]
      );
      return new User(Number(rows[0].id), rows[0].forename, rows[0].lastname, rows[0].role, rows[0].email, rows[0].password);
    },
    getUserByEmail: async (email) => {
      const { rows } = await pgPool.query("SELECT * FROM users WHERE email=$1", [
        email,
      ]);
      return new User(Number(rows[0].id), rows[0].forename, rows[0].lastname, rows[0].role, rows[0].email, rows[0].password);
    },
  }`;
}