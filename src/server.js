const fs = require('fs');
const { parse } = require('csv-parse');
const path = require('path');
const cron = require('node-cron');

var inProgress = false;

cron.schedule('*/5 * * * *', () => {
  console.log(`${new Date(Date.now()).toString()} - in progress flag: ${inProgress}`);
  if (!inProgress) {
    inProgress = true;
    fs.createReadStream(path.join(__dirname, 'files/rateSegment-UAT.csv')) //This returns event emitter
      .pipe(parse({
        columns: true //data is outputted as key-value considering every row is an object. Not just simple array with csv
      }))
      .on('data', (data) => {
        console.log(`${new Date(Date.now()).toString()} - Read chunk: ${JSON.stringify(data)}`);
      })
      .on('error', (error) => {
        inProgress = false;
        console.log(`${new Date(Date.now()).toString()} - Error occurred: ${error}`);
      })
      .on('end', () => {
        inProgress = false;
        console.log(`${new Date(Date.now()).toString()} - Reading done...`);
      });
  }
  else {
    console.log(`${new Date(Date.now()).toString()}: could not start, already in progress!!`)
  }
});