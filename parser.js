"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, firstName, lastName, email, phone, createdAt){
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
    this._file = fs.readFileSync(file, 'utf8')
    this._people = []

    
  }

  get people() {
    return this._people
  }
  
  addPerson() {
    var arrPeople = [];
    var row = this._file.split('\n').length-1
    var col = this._file.split('\n')[0].split(',').length-1

        for(let a=0; a < row; a++){
            arrPeople.push(this._file.split('\n')[a].split(','))
        } 

    return arrPeople;
  }

  addPeople(){
    var arrayPerson = this.addPerson();
    var arrObjPerson = [];
    
    arrObjPerson.push(aPeople);
    for(let a=0; a < arrayPerson.length; a++){
      var aPeople = new Person(arrayPerson[a][0]
                              ,arrayPerson[a][1]
                              ,arrayPerson[a][2]
                              ,arrayPerson[a][3]
                              ,arrayPerson[a][4]
                              ,arrayPerson[a][5])

      this._people.push(aPeople);    
    }
    return this._people;
  }

  save(){
    var string = '';
    
    for(let a = 0; a < this._people.length; a++){
        for(var key in this._people[a]){
          string += this._people[a][key];
          string += ', '
        }
        string += '\n';  
    }
    
    
    fs.writeFileSync('people2.csv', string);
    return 'data sudah dibuat';
  }

 

}


//driver code
let parser = new PersonParser('people.csv')

parser.addPerson();
parser.addPeople();
console.log(parser.save());

