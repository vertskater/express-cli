#!/usr/bin/env node

const {Command} = require('commander');
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');
const {folders} = require('./folders');
const {getDependencies} = require('./dependencies');
const {generateIndexContent} = require('./appContent');
const {generateEnvContent} = require('./envContent');
const {generateDbContent} = require('./dbContent');
const {generatePopulateDbContent} = require('./populateDB');
const {generateCreateKeyPairContent} = require('./keyPairContent');
const {generateUtilsContent} = require('./utilsContent');
const {generatePassportContent} = require('./passportContent');
const {generateUserModelContent} = require('./userModelContent');
const {generateDbUserContent} = require('./dbUserContent');
const {generateRoutesIndexContent} = require('./routesIndexContent');
const {generateRoutesUsersContent} = require('./routesUsersContent');
const {generateMiddlewareAuthContent} = require('./middlewareAuthContent');
const {generateMiddlewareUsersContent} = require('./middlewareUsersContent');
const {generatePrismaClientContent} = require('./prismaClientContent');
const {generatePrismaUser} = require('./prismaUserContent');
const {generatePrismaUserModel} = require('./prismaUserModel');

const program = new Command();
program.version('1.0.0').description('A CLI to create Express App with Auth');
program.command('create <projectName>')
  .description('creates a new project')
  .option('-a, --auth <withAuthentication>', 'boolean value to add auth with passportjs', true)
  .option('-p --prisma <withPrisma>', 'boolean value to add prisma orm', (value) => value === 'true', false)
  .action((projectName, options) => {
    // create folders
    fs.mkdirSync(projectName);
    folders.forEach(folder => {
        fs.mkdirSync(`${projectName}/${folder.name}`)
        if(folder.hasOwnProperty('subfolder')) {
            fs.mkdirSync(`${projectName}/${folder.name}/${folder.subfolder}`);
        }
    })
    //generate content
    const appContent = generateIndexContent(options.auth === true);
    const envContent = generateEnvContent();
    const dbContent = generateDbContent();
    const populateDB = generatePopulateDbContent();
    const keyPairContent = generateCreateKeyPairContent();
    const utilsContent = generateUtilsContent();
    const passportContent = generatePassportContent();
    const userModelContent = generateUserModelContent();
    const dbUserContent = generateDbUserContent();
    const routesIndexContent = generateRoutesIndexContent();
    const routesUsersContent = generateRoutesUsersContent();
    const middlewareAuthContent = generateMiddlewareAuthContent();
    const middlewareUsersContent = generateMiddlewareUsersContent();

    // create files
    fs.writeFileSync(path.join(projectName, 'app.js'), appContent);
    fs.writeFileSync(path.join(projectName, 'README.md'), `# ${projectName}`);
    // set .env file
    fs.writeFileSync(path.join(projectName, '.env.development'), envContent);
    // create db files
    if(options.prisma === true) {
        const prismaClientContent = generatePrismaClientContent();
        const prismaUserContent = generatePrismaUser();
        fs.writeFileSync(path.join(`${projectName}/db`, 'database.js'), prismaClientContent);
        fs.writeFileSync(path.join(`${projectName}/db`, 'user.js'), prismaUserContent);
    }else {
        fs.writeFileSync(path.join(`${projectName}/db`, 'database.js'), dbContent)
        fs.writeFileSync(path.join(`${projectName}/db`, 'user.js'), dbUserContent)
        fs.writeFileSync(path.join(`${projectName}/db`, 'populateDb.js'), populateDB)
        fs.writeFileSync(path.join(`${projectName}/db/models`,'User.js'), userModelContent)
    }
    //create lib files
    fs.writeFileSync(path.join(`${projectName}/lib`, 'generateKeyPair.js'), keyPairContent);
    fs.writeFileSync(path.join(`${projectName}/lib`, 'utils.js'), utilsContent);
    //create config files
    if(options.auth === true) {
      fs.writeFileSync(path.join(`${projectName}/config`, 'passport.js'), passportContent);
    }
    // create routes files
    fs.writeFileSync(path.join(`${projectName}/routes`, 'index.js'), routesIndexContent);
    fs.writeFileSync(path.join(`${projectName}/routes`, 'users.js'), routesUsersContent);
    // create middleware files
    fs.writeFileSync(path.join(`${projectName}/middleware`, 'auth.js'), middlewareAuthContent);
    fs.writeFileSync(path.join(`${projectName}/middleware`, 'users.js'), middlewareUsersContent);

    console.log(`Installing dependencies ...`);
    const dependencies = getDependencies(options.prisma)
    execSync('npm init -y', { cwd: projectName });
    execSync(`npm install ${dependencies.join(' ')}`, { cwd: projectName });

    console.log('adding scripts ...');
    const packageJsonPath = path.join(process.cwd(), `${projectName}/package.json`);
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.scripts = packageJson.scripts || {};
    packageJson.scripts['start'] = 'nodemon app.js --env-file=.env.development';

    fs.writeFileSync(packageJsonPath,JSON.stringify(packageJson, null, 2));
    if(options.prisma === true) {
        execSync('npx prisma init', { cwd: projectName });
        const userModel = generatePrismaUserModel();
        const prismaSchemaPath = path.join(projectName, 'prisma', 'schema.prisma');
        fs.appendFileSync(prismaSchemaPath, userModel);
    }
    console.log(`Project ${projectName} created successfully!`);
  });

program.parse(process.argv);