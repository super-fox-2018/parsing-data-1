'use strict'

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this._array = [];
    this._param = null;
  }

  people() {
    let array = fs.readFileSync(this._file, 'utf8').split('\n');
    this._param = array[0];
    for (let i = 1; i < array.length; i++) {
      this._people.push(new Person(...array[i].split(',')));
    }
    return this._people;
  }

  addPerson(object) {
    let newPerson = [object.id, object.firstName, object.lastName, object.email, object.phone, object.createdAt];
    this._people.push(new Person(...newPerson));
  }

  arrayOfObjectToArray () {
    let arrayOfObject = this._people;
    let array = [];
    array.push(this._param);
    for (let i = 0; i < arrayOfObject.length; i++) {
      array.push((Object.values(arrayOfObject[i]).join(',')));
    }
    this._array = array;
  }
}

const fs = require('fs');
const faker = require('fake');
let randomFirstName = faker.name.firstName();
let randomLastName = faker.name.lastName();
let randomEmail = faker.internet.email();
let random = faker.phone.phoneNumber();

let parser = new PersonParser('people.csv');
let michael = new Person('201', 'Michael', 'Cangcianno', 'mc@mail.com', '1-1234-567-8901', new Date());

parser.people();
parser.addPerson(michael);
parser.arrayOfObjectToArray();

console.log(parser._people);

// fs.writeFileSync('people2.csv', parser._array.join('\n')); // uncomment to start overwrite the people.csv

console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`);
