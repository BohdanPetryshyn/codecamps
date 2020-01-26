require('dotenv').config({ path: './config/config.env' });
require('colors');

const fs = require('fs');
const util = require('util');
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

const connectDb = require('./config/db');

const createItem = (resourceName, Model) => async resource => {
  try {
    await Model.create(resource);
    console.log(`${resourceName} item created.`.green);
  } catch (err) {
    console.log(`${resourceName} item creation failed.`.red.underline);
    console.log(err.message.red);
  }
};

const readFile = util.promisify(fs.readFile);

const readSeedJson = async resourceName => {
  const data = await readFile(
    `${__dirname}/_data/${resourceName}.json`,
    'utf-8'
  );
  return JSON.parse(data);
};

const seedResource = async (resourceName, Model) => {
  const bootcamps = await readSeedJson(resourceName);
  const creationPromises = bootcamps.map(createItem(resourceName, Model));
  return Promise.all(creationPromises);
};

const seedData = async () => {
  await connectDb();

  try {
    await seedResource('bootcamp', Bootcamp);
    await seedResource('course', Course);
    process.exit(0);
  } catch (err) {
    console.log(err.message.red.underline);
  }
};

const deleteResource = async (resourceName, Model) => {
  await Model.deleteMany();
  console.log(`${resourceName} data successfully deleted`.yellow);
};

const deleteData = async () => {
  await connectDb();

  try {
    await deleteResource('bootcamp', Bootcamp);
    await deleteResource('course', Course);
    process.exit(0);
  } catch (err) {
    console.log(err.message.red.underline);
  }
};

const command = process.argv[2];

if (command === 'seed') {
  seedData();
} else if (command === 'delete') {
  deleteData();
} else {
  console.log(`Unknown command ${command}`.red.underline);
  process.exit(1);
}
