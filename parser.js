"use strict"
var fs = require('fs') // baca file, taruh ini dluar class supaya bisa diakses secara global

class Person {
  constructor (id, first_name, last_name, email, phone, created_at){
    this.id=id
    this.first_name=first_name
    this.last_name=last_name
    this.email=email
    this.phone=phone
    this.created_at=created_at
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = [] // untuk bentuk array
  }

  convertAllPeople() {    
    var readFile = fs.readFileSync('people.csv','utf-8').split('\n') // baca file awal
    let data = readFile;
    // console.log(data)
    for(let i=0; i< data.length; i++){
      // console.log(data[i])
      var details = data[i].split(",");
      let person = new Person(details[0],details[1],details[2],details[3],details[4],details[5]) // baca per index after split
      this._people.push(person)
    }
  }

  get people() {
    let object ={
      data : this._people,
      size : this._people.length
    }
     return object
  }
  
  addPerson(id,firstName,lastName,email,phone,createdAt) { // untuk nambahin orang/data baru
    this._people.push(new Person(id,firstName,lastName,email,phone,createdAt))
  }

  save(){
    var str =""
    for(let i=0; i<this._people.length; i++){
      var valuesJoin=Object.values(this._people[i]).join(",")
      str +=  valuesJoin + "\n"
    }
    fs.writeFileSync('people.csv', str, 'utf8')
  }
}

var parser = new PersonParser('people.csv')
parser.convertAllPeople()
parser.addPerson(201, "tia", "anggraeni", "test@mail.com", "12345679", new Date())
console.log(parser.people.data[201])
parser.save()

console.log(`There are ${parser.people.size} people in the file '${parser._file}'.`)
