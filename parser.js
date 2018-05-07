"use strict"

var fs = require('fs')
var strFile=fs.readFileSync('people.csv', 'utf8').split("\r\n")

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor() {
    this._id
    this._first_name
    this._last_name
    this._email
    this._phone
    this._created_at
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._peopleArr = []
    this._people = []
    this._peopleArrSave =[]
    this._peopleStrArr=[]
  }

  get people() {
    return this._people
  }

  createPerson () {
    
    for(let i=0; i<this._file.length; i++) {
      this._peopleArr.push(this._file[i].split(","))
    }
  
    for(let j=0; j<this._peopleArr.length; j++) {
      
        this._people.push({})
    }
    
    for(let k=0; k<this._peopleArr.length; k++) {
  
        this._people[k].ID=this._peopleArr[k][0]
        this._people[k].FirstName=this._peopleArr[k][1]
        this._people[k].LastName=this._peopleArr[k][2]
        this._people[k].Email=this._peopleArr[k][3]
        this._people[k].Phone=this._peopleArr[k][4]
        this._people[k].Created=this._peopleArr[k][5]
    }
  
    return this._people 
   
  }
  

  addPerson(obj) {

    this._people.push(obj)
    
  }

  save () {

    for(let c=0; c<this._people.length; c++) {    
      this._peopleArrSave.push([])
    }

    for(let d=0; d<this._peopleArrSave.length; d++) {
      this._peopleArrSave[d].push(this._people[d].ID)
      this._peopleArrSave[d].push(this._people[d].FirstName)
      this._peopleArrSave[d].push(this._people[d].LastName)
      this._peopleArrSave[d].push(this._people[d].Email)
      this._peopleArrSave[d].push(this._people[d].Phone)
      this._peopleArrSave[d].push(this._people[d].ID)
    }

    for(let r=0; r<this._file.length; r++) {
      this._peopleStrArr[r].push(this._peopleArrSave[r].join(","))
    }
    
    return this._peopleStrArr
  }

}

let parser = new PersonParser(strFile)

//console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

parser.createPerson()
parser.addPerson({
  ID= '300',
  FirstName= 'Emon',
  LastName= 'Chrome',
  Email= 'tralalala@gmail.com',
  Phone= '3-2345-879',
  Created= '2017-06-05',
})
//console.log(parser._people)
parser.save()

fs.writeFileSync('people.csv', parser._peopleStrArr).join("\n")

//fs.readFileSync('people.csv', 'utf8').split("\n")