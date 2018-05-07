"use strict"

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,firstName,lastName,email,phone,createdAt) {
    this.id=id;
    this.firstName=firstName;
    this.lastName=lastName;
    this.email=email;
    this.phone=phone;
    this.createdAt=createdAt;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = [];
  }

  personData() {
    var fs=require('fs');
    let csvFile=fs.readFileSync(this._file).toString().split("\n");

    //multiDimensi
    var multiDimArr=[];
    //multiDim
    for(var i=0;i<csvFile.length;i++) {
      multiDimArr.push([csvFile[i]]);
    }


    var newMultiDim=[];
    for(var j=0;j<multiDimArr.length;j++) {
      newMultiDim.push(multiDimArr[j][0].split(','));
    }


    for(var k=1;k<newMultiDim.length;k++) {
       if (newMultiDim[k].length > 1){
          this._people.push(new Person(newMultiDim[k][0],newMultiDim[k][1],newMultiDim[k][2],newMultiDim[k][3],newMultiDim[k][4],newMultiDim[k][5]))
      }
    }
    return this._people;
  }

  get people() {
    return this._people;
  }

  convertToString() {
    var store=''
    for(let i=0;i<this._people.length;i++) {
      store+=this._people[i].id + ',';
      store+=this._people[i].firstName + ',';
      store+=this._people[i].lastName + ',';
      store+=this._people[i].email + ',';
      store+=this._people[i].phone + ',';
      store+=this._people[i].createdAt + '\n';
      
    }
    return store;
  }

  addPerson(param) {
   this._people.push(person);
   return this;

  }
  save(){
    var fs=require("fs");
    var data=fs.writeFileSync(this._file,parser.convertToString());
  }

}


let parser = new PersonParser('people.csv');
let person= new Person("201","Aldo","Prakoso","alprak@gmail.com","0123123","2018-02-22T10:09:03-08:00")

parser.personData();
parser.addPerson(person).save();
console.log(parser.convertToString())

