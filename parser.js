"use strict"

const fs = require('fs')

class Person {
  constructor(id,first_name,last_name,email,phone,created_at){
    this.id = id ;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;

  }
  // Look at the above CSV file
  // What attributes should a Person object have?
}

class PersonParser {

  constructor(file) {
    this._file = fs.readFileSync(file, 'utf8');
    // this._people = this._file.split('\n')
    this._people = this._file.split('\n')
  }

  get people() {
    let finalArr = [];
    let newArr = [];
    for(let z = 1; z < this._people.length; z ++){
      newArr.push(this._people[z].split(','))
    }
    for(let k = 0; k < newArr.length; k++){
      finalArr.push(new Person(...newArr[k]))
    }
    this._people = finalArr;
    return this._people;

  }

  addPerson(id,first_name,last_name,email,phone,created_at) {
    let backToString = '';
    for(let g = 0 ; g < this._people.length; g++ ){
      backToString += this._people[g] + '\n'
    }
    backToString += `${id},${first_name},${last_name},${email},${phone},${created_at} \n`
    return backToString

  }

}

let parser = new PersonParser('people.csv')

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
console.log(parser.addPerson('dasddads'))
