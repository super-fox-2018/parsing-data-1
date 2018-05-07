"use strict"

const fs = require('fs');

let fileCSV = fs.readFileSync('./people.csv', 'UTF-8').split('\n')
 //console.log(fileCSV.length); // 201 file
 //console.log(fileCSV);

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(data) {
    this._id = data.id;
    this._firstName = data.firstName;
    this._lastName = data.lastName;
    this._email = data.email;
    this._phone = data.phone;
    this._createdAt = data.createdAt;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.convert()
  }

  convert () {
    let arrFileCSV = [];
    for (let i = 0; i < fileCSV.length; i++) {

      let obj = {};
      obj.id = fileCSV[i].split(',')[0];
      obj.firstName = fileCSV[i].split(',')[1];
      obj.lastName = fileCSV[i].split(',')[2];
      obj.email = fileCSV[i].split(',')[3];
      obj.phone = fileCSV[i].split(',')[4];
      obj.createdAt = new Date(fileCSV[i].split(',')[5]);  
      arrFileCSV.push(new Person(obj));  
    }
    return arrFileCSV;
  }

  get people() {
    return this
  }

  addPerson(objData) {
    this._people.push(objData);
  }

  savePerson() {

    let indexTerakhir = this._people.length-1;
    let string = `${this._people[indexTerakhir]._id},${this._people[indexTerakhir]._firstName},${this._people[indexTerakhir]._lastName},${this._people[indexTerakhir]._email},${this._people[indexTerakhir]._phone},${this._people[indexTerakhir]._createdAt}`;
    let fileCSV1 = fs.readFileSync('./people1.csv', 'UTF-8')
    let newCSV = fileCSV1 + '\n' + strNewPerson;
    return fs.writeFileSync('./people1.csv')
  }

  get size() {
    return this._people.length;
  }

  get file() {
    return this._file;
  }

}




let parser = new PersonParser('./people1.csv');
let person
// console.log(parser.file);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log();

// RELEASE 0
// console.log(parser.people);

// RELEASE 1
// console.log(parser.people[200]);
let objData = {};
  objData.id = '201';
  objData.firstName = 'Arief';
  objData.lastName = 'Ardi';
  objData.email = 'arief.ardi@gmail.com';
  objData.phone = '0215303204';
  objData.createdAt = new Date('2015-02-22T10:09:03-08:00');  

//console.log(objData);