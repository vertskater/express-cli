# Express App CLI

## Overview
This CLI tool automates the setup of an Express.js project with authentication using Passport.js. It generates the necessary folder structure, boilerplate code, and installs required dependencies.


## Installation

To install the CLI globally, run:
```sh
npm install -g express-install
```

Or, if using locally, navigate to the project directory and run:
```sh
npm link
```

## Usage
To create a new Express.js project, use:
```sh
express-install create <projectName>
```

### Options
| Option | Alias | Description | Default  |
|--------|-------|-------------|----------|
| `--auth` | `-a` | Enables authentication using Passport.js | `true`   |
 | `--prisma`| `-p`| Enables Prisma ORM | `false`  |

Example:
```sh
express-install create my-express-app --auth false --prisma true
```

## Features
- Generates a structured Express.js application.
- Optional Passport.js authentication setup.
- Optional Prisma ORM integration.
- Pre-configured `.env.development` file.
- Includes database setup with models and utilities.
- Installs required dependencies automatically.

## Project Structure
After running the command, the generated project will have the following structure:
```
my-express-app/
├── db/
│   ├── database.js
│   ├── populateDb.js
│   ├── models/
│   │   ├── User.js
│   ├── user.js
├── lib/
│   ├── generateKeyPair.js
│   ├── utils.js
├── config/
│   ├── passport.js (if authentication is enabled)
├── routes/
│   ├── index.js
│   ├── users.js
├── middleware/
│   ├── auth.js
│   ├── users.js
├── .env.development
├── app.js
├── package.json
├── README.md
```
## Before You Strart Using the Project

Before running the CLI, ensure you:

 - Execute the generateKeyPair.js file to generate key pairs.
 - Create a PostgreSQL database.
 - Set environment variables in ```.env.development``` to configure the PostgreSQL connection.
 - If using Prisma add the Database DSN to the ```.env``` file.
 - If using Prisma, run ```npx prisma migrate dev``` to apply migrations.

## Scripts
After project creation, you can start the server using:
```sh
npm start
```
This runs:
```sh
node app.js --env-file=.env.development --watch
```

## Dependencies
The CLI automatically installs the following dependencies:
- Express
- Passport.js (if enabled)
- Nodemon
- Additional dependencies required for authentication and database interaction.

## Contributing
If you want to improve this CLI, feel free to fork the repository and submit a pull request.

## License
MIT License

