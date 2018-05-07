"use strict"
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(obj) {
    this.id = obj.id
    this.first_name = obj.first_name
    this.last_name = obj.last_name
    this.email = obj.email
    this.phone = obj.phone
    this.created_at = new Date().toISOString()
  }
}

// const csvParser = require('people.csv')

const fs = require('fs')

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  parseCSV() {
    let fileStr = fs.readFileSync(this._file, 'utf8')
    let lines = fileStr.split("\n")
    for (var i = 1; i < lines.length-1; i++) {
      let linePerson = lines[i].split(",")
      // console.log(linePerson);
      this._people.push(new Person({
        id: linePerson[0],
        first_name: linePerson[1],
        last_name: linePerson[2],
        email: linePerson[3],
        phone: linePerson[4],
        created_at: linePerson[5],
      }))
      // console.log(lines[i].split(','));
    }

    // fs.readFile(this._file, 'utf8', (err, data) => {
    //   if (!err) {
    //     data
    //     // this._people = csvParser(data).asObjects()
    //     this._people.data = csvParser(data).asObjects()
    //     this._people.size = this.people.data.length
    //
    //     console.log(this._people.data);
    //   } else {
    //     console.log(err)
    //   }
    // })
  }

  addPerson(dataObj) {
    const lastPerson = this._people;
    dataObj.id = this._people.length + 1
    // console.log(lastPerson);
    this._people.push(dataObj)
    // console.log(this._people);
  }

  get people() {
    return this._people
  }

  save() {
    let lastRows = this._people.slice(-1)[0]
    let newRows = `${lastRows.id},${lastRows.first_name},${lastRows.last_name},${lastRows.email},${lastRows.phone},${lastRows.created_at}`
    // fs.appendFileSync ('person.csv', newRows)

    fs.appendFile('people.csv', newRows, (err, data) => {
      if (!err) {
        console.log(data);
      } else {
        console.log(err)
      }
    })
    //ambil last ID from file csv, add 1 every loop
  }

}

let parser = new PersonParser('people.csv')
 let testData = {id:0, first_name:'Olla', last_name:'La', email:'olla@xendit.co', phone :'1-369-893-7454', created_at : '2012-08-06T06'}
parser.parseCSV()
console.log(parser.people.length);
parser.addPerson(testData)
parser.save()
// console.log(parser._people);

// console.log(parser.people.data)
// console.log(`There are ${parser._people.size} people in the file '${parser._file}'.`)
