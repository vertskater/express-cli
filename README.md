# Express App CLI

## Overview
This CLI tool automates the setup of an Express.js project with authentication using Passport.js. It generates the necessary folder structure, boilerplate code, and installs required dependencies.


## Installation

To install the CLI globally, run:
```sh
npm install -g <your-cli-name>
```

Or, if using locally, navigate to the project directory and run:
```sh
npm link
```

## Usage
To create a new Express.js project, use:
```sh
my-cli create <projectName>
```

### Options
| Option | Alias | Description | Default |
|--------|-------|-------------|---------|
| `--auth` | `-a` | Enables authentication using Passport.js | `true` |

Example:
```sh
my-cli create my-express-app --auth false
```

## Features
- Generates a structured Express.js application.
- Optional Passport.js authentication setup.
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

Before running the start script, ensure you:

Execute the ```generateKeyPair.js``` file to generate key pairs.

Create a PostgreSQL database.

Set environment variables in ```.env.development``` to configure the PostgreSQL connection.

## Scripts
After project creation, you can start the server using:
```sh
npm start
```
This runs:
```sh
nodemon app.js --env-file=.env.development
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

