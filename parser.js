"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor() {
    this.id = '';
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.phone = ''
    this.create_at = ''
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.generateArray();
  }

  generateArray() {
    let fs = require('fs');
    let stringFile = fs.readFileSync('people.csv', 'utf8').split('\n');
    let arrPeople = stringFile.slice(1);
    let arrResult = [];
    for (let i = 0; i < arrPeople.length; i++) {
      if (arrPeople[i].length !== 0) {
        let arrPerson = arrPeople[i].split(',');
        let person = new Person();
        person.id = arrPerson[0];
        person.firstName = arrPerson[1];
        person.lastName = arrPerson[2];
        person.email = arrPerson[3];
        person.phone = arrPerson[4];
        person.create_at = new Date(arrPerson[5]);
        arrResult.push(person);
      }
    }
    return arrResult;
  }

  get people() {
    return this._people;
  }

  get file() {
    return this._file;
  }

  addPerson(person) {
    person.id = (this._people.length + 1).toString();
    this._people.push(person);
  }

  save() {
    let strPerson = [];
    let stringArr = 'id,first_name,last_name,email,phone,created_at' + '\n';
    for (let i = 0; i < this._people.length; i++) {
      stringArr = stringArr + this._people[i].id + ',' + this._people[i].firstName + ',' + this._people[i].lastName + ',' +
        this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].create_at + '\n';
    }
    // console.log(stringArr);
    let fs = require('fs');
    fs.writeFileSync('people.csv', stringArr);
  }

}

let parser = new PersonParser('people.csv');
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

let person = new Person();
person.firstName = 'Mak';
person.lastName = 'uwo';
person.email = 'makuwo.gambreng@gmail.com'
person.phone = '123-456-789'
person.create_at = new Date();

parser.addPerson(person);
parser.save();
