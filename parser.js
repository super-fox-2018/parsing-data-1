"use strict"

const fs = require('fs');

class Person {

  constructor(id,first_name,last_name,email,phone,created_at){
      this.id = id;
      this.fname = first_name;
      this.lname = last_name;
      this.email = email;
      this.phone = phone;
      this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.objParser()
  }

  get people() {
    // console.log(this._people);
    return this._people
  }


  arrParser(){
    var spl = this._file;
    var arr_pers = [];
    for (var i = 1; i < spl.length; i++) {
      arr_pers.push(spl[i].split(','));
    }
    return arr_pers;
  }

  objParser(){
    var arrPers = this.arrParser();
    for (var i = 0; i < arrPers.length; i++) {
      if(arrPers[i][0] !== '') {
        var pers = new Person(arrPers[i][0],arrPers[i][1],arrPers[i][2],arrPers[i][3],arrPers[i][4],arrPers[i][5]);
        this._people.push(pers);
      }
    }
  }
  addPerson(firstname, lastname,email,phone,created_at) {
    var pers = new Person(this._people.length+1,firstname, lastname,email,phone,new Date(created_at));
    this._people.push(pers);
    return this._people;
  }

  convertToString(){
    // var string = this.addPerson();
    var data_str = '';
    data_str += 'id,first_name,last_name,email,phone,created_at\n'

    for (var i = 0; i < this._people.length; i++) {
      for(var key in this._people[i]){
        if(key === 'created_at'){
          data_str += this._people[i][key];
        }
        else {
          data_str += this._people[i][key]+',';
        }
      }
      data_str += '\n';
    }
    return data_str;
  }

  writeToFile(data_str) {
    fs.writeFileSync('people.csv', data_str);
  }
}

var peop = fs.readFileSync('people.csv','utf8').split('\n');
let parser = new PersonParser(peop);
parser.addPerson('shanti','dyah','shantidyah@gmail.com','085678329812','2015-03-23T17:00:56-09:00')


let data_str = parser.convertToString()
parser.writeToFile(data_str)

// console.log();
console.log(`There are ${parser.people.length} people in the file.`)
