"use strict"

const fs = require('fs');
const faker = require('faker');

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this._id = id;
    this._firstName = firstName;
    this._lastName = lastName;
    this._email = email;
    this._phone = phone;
    this._createdAt = new Date(createdAt);
  }

  set id(id){
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get firstName() {
    return this._firstName;
  }

  get lastName() {
    return this._lastName;
  }

  get email() {
    return this._email;
  }

  get phone() {
    return this._phone;
  }

  get createdAt() {
    return this._createdAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = this.generateArray();
  }

  generateArray() {
    const result = [];
    const output = fs.readFileSync(this._file, 'utf8').split('\n').slice(1);
    const array = [];
    for (let i = 0; i < output.length; i += 1) {
      const string = output[i];
      if (string !== '') array.push(string.split(','));
    }
    for (let i = 0; i < array.length; i += 1) {
      result.push(new Person(...array[i]));
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
    const newId = this._people.length + 1;
    person.id = newId;
    this._people.push(person);
  }

  save() {
    const keys = Object.keys(this._people[0]);
    let str = '';
    for (let i = 0; i < keys.length; i += 1) {
      str += keys[i].slice(1);
      if (i === keys.length-1) str += '\n';
      else str += ',';
    }

    for (let i = 0; i < this._people.length; i += 1) {
      const person = this._people[i];
      const arr = [person.id, person.firstName, person.lastName, person.email, person.phone, person.createdAt];
      str += `${arr.join(',')}`;
      if (i !== this._people.length - 1) str += '\n';
    }

    fs.writeFileSync('people.csv', str);
  }
}

let parser = new PersonParser('people.csv');

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);


/**
 * SEEDING
 */
for (let i = 1; i <= 100; i += 1) {
  const id = faker.random.number();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const phoneNumber = faker.phone.phoneNumber('1-###-###-####');
  const date = faker.date.future();
  const person = new Person(id, firstName, lastName, email, phoneNumber, date);
  parser.addPerson(person);
}

parser.save();

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`);
