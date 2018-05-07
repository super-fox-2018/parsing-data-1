"use strict"

const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const faker = require('faker');

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = new Date(createdAt);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.generateArray();
  }

  generateArray() {
    const result = [];
    const string = fs.readFileSync(this._file, 'utf8');
    const output = parse(string, { from: 2 });
    for (let i = 0; i < output.length; i += 1) {
      result.push(new Person(...output[i]));
    }

    return result;
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  addPerson(person) {
    const arr = [];
    const infos = Object.keys(person).map(key => {
      arr.push(person[key]);
    });
    this._people.push(arr);
  }

  save() {
    const string = stringify(this._people, { header: true });
    fs.writeFileSync('people.csv', string);
  }
}

let parser = new PersonParser('people.csv');

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);


/**
 * SEEDING
 */
// for (let i = 1; i <= 100; i += 1) {
//   const id = faker.random.number();
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   const email = faker.internet.email();
//   const phoneNumber = faker.phone.phoneNumber('1-###-###-####');
//   const date = faker.date.future();
//   const person = new Person(id, firstName, lastName, email, phoneNumber, date);
//   parser.addPerson(person);
// }

// parser.save();

// console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);



