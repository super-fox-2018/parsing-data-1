"use strict"
const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first,last,email,phone,created){
    this.id = id
    this.first_name =first
    this.last_name = last
    this.email = email
    this.phone = phone
    this.created_at = created
  }


}

class PersonParser {

  constructor(file) {
  
    this._file = fs.readFileSync(file,'utf8')
    this._people = []

  }

  get people() {
    return this._people
  }

  addPerson() {
    var arr =[]
    var row = this._file.split('\n')
    // console.log(row)
    for(let i=0;i<row.length;i++){
      arr.push(row[i].split(','))
    }
    return arr
  }

  addObj(){
    let person = this.addPerson()
   
    let newArr=[]
    for(let i=0;i<person.length;i++){
      var newObj= new Person(person[i][0],person[i][1],person[i][2],
                             person[i][3],person[i][4],person[i][5] )

        newArr.push(newObj)
    }
    
    return newArr
  }

  changeStr(){
    let obj = this.addObj()
    let str =''
    let newStr=''
    for(var i =0;i<obj.length;i++){
      // str =''
      for(var j in obj[i]){
        str+=obj[i][j]+ ','       
      }
     str +='\n'
    }
  
    return str
  }

  save(){
      fs.writeFileSync('newPeople.csv',this.changeStr())
      return 'new data'
  }

  





}

let parser = new PersonParser('people.csv')
console.log(parser.save())
// parser.save()
// console.log(parser.addObj())
// var text = fs.readFileSync('people.csv','utf8').split('\n')
// console.log(text)

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
