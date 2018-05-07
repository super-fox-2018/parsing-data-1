"use strict"
const fs = require('fs');

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
    for (let i = 0; i < persons.length; i++) {
      var person = new Person(persons[i][0], persons[i][1], persons[i][2], persons[i][3], persons[i][4], persons[i][5]);
      this._people.push(person);
    }
    // console.log(this._people);
    // console.log(this._people.length);
    return this._people
  }

  addPerson(person) {
    // push to this._people
    this._people.push(person);
  }

  save() { // array of objects to string
    let string = 'id,first_name,last_name,email,phone,created_at\n';

    for (let i = 0; i < this._people.length; i++) {
      let person = this._people[i];
      let array = [person.person_id, person.first_name, person.last_name, person.email, person.phone, person.created_at];
      string = string + array.join(',');

      if (i !== this._people.length - 1) string = string + '\n'
    }
    fs.writeFileSync('people.csv', string);
  } // override csv

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person('201', 'Rhesa', 'Utomo', 'rhesa.utomo@gmail.com', '081123456789', '2012-05-05T11:07:33-07:00'))
// console.log(parser.people)
console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
parser.save()
