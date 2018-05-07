"use strict"

const fs = require('fs');

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
    this._fileStr = fs.readFileSync(file, 'utf8')
    this._people = this.backToString();
  }  

  get people() {
    return this._people;
  }

  addPerson() {
    let arrPeople = [];
    let row = []

    let lines = this._fileStr.split('\n')
    let attributes = lines[0]
    let valueLines = lines.slice(1)

    for(let i = 0; i < valueLines.length; i++){
      let line = valueLines[i]
      let lineValues = line.split(",")
      let id = lineValues[0]
      let name = lineValues[1];
      let last = lineValues[2];
      let email = lineValues[3];
      let phone = lineValues[4];
      let createdAt = lineValues[5];
      var personObj = new Person(id, name, last, email, phone, createdAt);
      row.push(personObj);
    }

    return row;
  }

  backToString() {
    let input = this.addPerson();
    var strBack = '';
    for(let i = 0; i < input.length; i++) {
      for(let key in input[i]) {
        if(key == 'createdAt') {
          strBack += input[i][key];
        } else {
          strBack += input[i][key] + ', ';
        }
      }
      strBack += '\n';
    }
    return strBack;
  }

  save() {
    fs.writeFileSync('newPeople.csv', this.backToString());
    return 'new data recorded'
  }

}

let person = new PersonParser('people.csv')

console.log(person.save());

// console.log('There are people in the file ');

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
