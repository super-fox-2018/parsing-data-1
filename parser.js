"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.person_id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = new Date(created_at);
  }
}

class PersonParser {
  
  constructor(file) {
    this._file = file
    this._people = this.generateArray();
    //this.size = 0;
  }
  
  get people() {
    return this._people // final output: array
  }

  get file() {
    return this._file;
  }
  
  generateArray() {
    const fs = require('fs');
    let parser = fs.readFileSync(this._file, 'utf8');
    //console.log(parser);
    let parserArray = parser.split('\n');
    //console.log(parserArray);
    let categories = [];
    let peopleArray = [];
    this._people = [];
  
    for (let i = 0; i < parserArray.length; i++) {
      if (i === 0) {
        let array = parserArray[i].split(',');
        for (let j = 0; j < array.length; j++) {
          categories.push(array[j]);
        }
      } else {
        peopleArray.push(parserArray[i]);
      }
    }
    //console.log(categories)
    //console.log(peopleArray)
    let persons = [];
    for (let i = 0; i < peopleArray.length; i++) {
      let array = peopleArray[i].split(',')
      persons.push(array);
    }
    //console.log(persons);
    let counter = 0
    for (let i = 0; i < persons.length; i++) {
      var person = new Person(persons[i][0], persons[i][1], persons[i][2], persons[i][3], persons[i][4], persons[i][5]);
      this._people.push(person);
      counter++;
    }
    // console.log(this._people)
    // this.size = this._people.length;
    //console.log(this._people.length);
    return this._people
  }

  addPerson(object) {

  }

}

let parser = new PersonParser('people.csv')
// parser.addPerson(new Person(...))
// parser.save()
// console.log(parser.people)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
