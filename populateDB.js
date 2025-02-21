export const generatePopulateDbContent = () => {
  return  `
    const { Client } = require("pg");

    const SQL = \`
        CREATE TABLE IF NOT EXISTS roles
        (
            id   INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            role VARCHAR(100) UNIQUE
        );
        INSERT INTO roles (role)
        VALUES ('user'),
               ('member'),
               ('admin');
    
        CREATE TABLE IF NOT EXISTS users
        (
            id       INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            forename VARCHAR(100),
            lastname VARCHAR(100),
            email    VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role     INTEGER      NOT NULL DEFAULT 1,
            CONSTRAINT fk_role FOREIGN KEY (role) REFERENCES roles (id)
        );
    \`;
   
    async function main() {
      console.log("seeding...");
      const host = process.env.HOST || 'localhost';
      const client = new Client({
        connectionString: \`postgresql://\${process.env.PGUSER}:\${process.env.PGPASSWORD}@\${host}:5432/\${process.env.PGHOST}\`,
      });
      await client.connect();
      await client.query(SQL);
      await client.end();
      console.log("done");
    }
    
    main();
    `;

}