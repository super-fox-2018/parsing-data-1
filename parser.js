"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
    this.idNum = id;
    this.firstName = first_name;
    this.lastName = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  parseFromFile() {
    var fs = require('fs')
    var people = fs.readFileSync('people.csv', 'utf8');
    var parsed = people.split(/\r\n|\n/);

    for(let i = 1; i < parsed.length ;i++){
      var person = new Person(parsed[i].split(",")[0], parsed[i].split(",")[1], parsed[i].split(",")[2], parsed[i].split(",")[3], parsed[i].split(",")[4], parsed[i].split(",")[5])
      this._people.push(person)
    }

  }

  addPerson(first_name, last_name, email, phone) {
    let id;
    if(this._people.length!== 0){
      id = parseInt(this._people[this._people.length-1].idNum) +1;
    }
    else{
      id = 1;
    }
    var content = [];
    this._people.push(new Person(id,first_name,last_name,email,phone, new Date()))
   //
   for(let i = 0; i < this._people.length; i++){
     let line = [this._people[i].idNum, this._people[i].firstName, this._people[i].lastName, this._people[i].email, this._people[i].phone, this._people[i].created_at.toUTCstring()]
     content.push(line);
   }
   let newFileStr = content.join("\n")
   // console.log(content)
    var fs = require('fs');
    fs.writeFileSync('people.csv',newFileStr);

  }

}



let parser = new PersonParser('people.csv');

parser.parseFromFile();
parser.addPerson("Garrus", "Vakarian", "g@normandy.com", "1-425-773-7923");

// parser.addPerson();
console.log(parser._people[0])
console.log(parser._people[parser._people.length - 1])
console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
