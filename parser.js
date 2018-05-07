"use strict"

const fs = require('fs');
const stringify = require('stream-transform')
const faker = require('faker')

class Person {
  constructor(firstName,lastName,email,phone){
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.phone = phone
    this.createdAt = this.getCurrentTime()
  }

  getCurrentTime(){
    const D = new Date()
    return D
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this._size = null
  }

  get people() {
    return this._people
  }
  get file(){
    return this._file
  }
  get size(){
    this._size = this.people.length
    return this._size-1
  }
  readFile(){
    this._people = fs.readFileSync(this.file,'utf-8').split('\r\n')
    this._people.splice(this._people.length-1,1)
  }
  splitData(){
    for(let i = 0; i < this.people.length; i++){
      this.people[i] = [...this.people[i].split(',')]
    }
  }

  addPerson(firstName,lastName,email,phone) {
    const person = new Person(firstName,lastName,email,phone)

    let newIdx = parseInt(this.people[this.people.length-1][0])+1
    this.people.push(`${newIdx},${person.firstName},${person.lastName},${person.email},${person.phone},${person.createdAt}`.split(','))

    return "sudah dipush"
  }

  writeData(){
    const file = this.file
    stringify(this.people, function(data){
      data.push(data);
      return data.join(',')+'\r\n';
    }, function(err, output){
      for(let i = 0; i < output.length; i++){
        output[i] = output[i].split(',')
        output[i][output[i].length-2] += output[i][output[i].length-1]
        output[i].splice(output[i].length-1,1)
        output[i].join(',')
      }
      fs.writeFileSync(file,output.join(''),'utf-8',(err)=>{
        if (err) throw err;
      })
    });
    return "data di write!"
  }
}

let parser = new PersonParser('people.csv')
parser.readFile()
parser.splitData()
for(let n = 0; n < 100; n++){
  var randomfirstName = faker.name.firstName(); 
  var randomlastName = faker.name.lastName();
  var randomEmail = faker.internet.email(); 
  var phoneNumber = faker.phone.phoneNumber();
  console.log(parser.addPerson(randomfirstName,randomlastName,randomEmail,phoneNumber))
}
console.log(parser.people)
parser.writeData()
console.log(parser.size)
// var randomfirstName = faker.name.firstName(); 
// var randomlastName = faker.name.lastName();
// var randomEmail = faker.internet.email(); 
// var phoneNumber = faker.phone.phoneNumber();
// console.log([randomfirstName,randomlastName,randomEmail,phoneNumber])

// console.log(parser._file)
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

