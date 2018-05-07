"use strict"

const fs = require('fs'); //fs is a script from the node.js library to access FILE SYSTEM

class Person { // this is to set each 'Person's' attributes
   constructor (id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.firstName = first_name
    this.lastName = last_name
    this.email = email
    this.phone = phone
    this.createdAt = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  getPeople() {
    let getPerson = new Person
    let data_str = fs.readFileSync(this._file, 'utf8'); //Get the data here (default type: Buffer)  //utf8 -> in string form
    let data_arr = data_str.split('\n')

    for (let i = 1; i < data_arr.length; i++) {
      if(data_arr[i][0] !== undefined) {
        this._people.push(new Person(...data_arr[i].split(',') ) )
      }
    }

    return this._people

  }

  addPerson(param_first_name, param_last_name, param_email, param_phone) {
    // console.log(this._people)
    let last_id = this._people[this._people.length - 1].id //takes LAST object id's value and uses for counter
    let new_id = +last_id
    new_id += 1

    let person = new Person(new_id, param_first_name, param_last_name, param_email, param_phone, new Date())
    this._people.push(person)
    return this._people
  }

  save() {
    // console.log(this._people)
    const keys = Object.keys(this._people[0]);
    // let arr_joined = []
    let str_joined = ''
    for (let i = 0; i < keys.length; i ++) {
      str_joined += keys[i]
      if (i === keys.length-1) {
        str_joined += '\n'
      }
      else {
        str_joined += ','
      }
    }

    for (let i = 0; i < this._people.length; i ++) {
      let person = this._people[i];
      let array = [person.id, person.firstName, person.lastName, person.email, person.phone, person.createdAt];
      str_joined+= `${array.join(',')}`;
      if (i !== this._people.length - 1) {
        str_joined += '\n'
      }

    }
    fs.writeFileSync('people.csv');
  }
}


let parser = new PersonParser('people.csv')
parser.getPeople()
parser.addPerson('Tushar','Bedi','tushar@email.com',4613639)
parser.save();
// console.log(parser.addPerson())
// console.log(parser.addPerson('tushar','bedi','email',12345,));

// [Person {firstName: }, Person {}, Person {}]
