"use strict"
var fs = require('fs')

class Person {
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }
} // end class person


// PARSE FROM CSV TO ARRAY OF OBJECT
class PersonParser {

  constructor(fileName) {
    this._fileName = fileName
    this._people = []
  }

  parseData() {

    //call CSV file
    var data = fs.readFileSync(this._fileName, 'utf8').split('\n')

    for (let i = 1; i < data.length - 1; i++) {
      let csvLine = data[i].split(',')
      if (data[i][0] !== '') {
        var person = new Person(csvLine[0], csvLine[1], csvLine[2], csvLine[3], csvLine[4], csvLine[5])
        this._people.push(person)

      }

    }
    return this._people

  }

  get getterPeople() {
    //show array of object
    // return this._people
    //
    // var person = new Person('1', 'lani', 'rollins', ...)
    // this._people.push(person)

    return this._people
  }

  addPerson(id, first_name, last_name, email, phone, created_at) {

    var objadd = new Person(id, first_name, last_name, email, phone, created_at);
    this._people.push(objadd)
    return this._people

  }


  save() {
    var string = '';
    string += 'id,first_name,last_name,email,phone,created_at' + '\n';


    for (let i = 0; i < this._people.length; i++) {

      for (let j in this._people[i]) {

        if (j === 'created_at') {
          string = string + this._people[i][j]
        } else {
          string += this._people[i][j] + ','
        }
      }
      string = string + '\n'

    }
    return string

  }

  writeToFile(ad) {
    fs.writeFileSync('example.csv', ad)
  }

} //end personparser class

// var personku = new Person('example.csv');
var parser = new PersonParser('example.csv')
let before = parser.parseData()

// PersonParser id, first_name, last_name, email, phone, created_at
parser.addPerson('6', 'HANDI', 'Priyono', 'handi@gmail.com', '06167666', '11 november')
parser.addPerson('7', 'Dina', 'Danu', 'dina@gmail.com', '1988171771', '10 MEI')
parser.addPerson('8', 'Dona', 'Dunu', 'dioha@gmail.com', '892822', '11 maret')

console.log(before)
// console.log(before)


let datastring = parser.save()
parser.writeToFile(datastring)






console.log(`There are ${parser.getterPeople.length} people in the file`)
