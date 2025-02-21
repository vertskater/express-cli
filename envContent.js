export const generateEnvContent = () => {
  return `
    PORT=3000
    #Database (Postgresql)
    PGDATABASE="fill in db"
    PGUSER="fill in user"
    PGPASSWORD="fill in password"
    PGHOST=localhost
    PGPORT=5432
    `;
}
