const fs = require('fs');
const csv = require('csv');
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');

const sourceFile = process.argv[2];
const destinationFile = process.argv[3];


const input = fs.readFileSync(sourceFile, 'utf8');
const array = parse(input);
const string = stringify(array);
fs.writeFileSync(destinationFile, string);
