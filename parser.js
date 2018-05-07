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
      data : this._people, // read all file hasil convert
      size : this._people.length // read panjangnya
    }
     return object
  }
  
  addPerson(id,firstName,lastName,email,phone,createdAt) { // untuk nambahin orang/data baru
    this._people.push(new Person(id,firstName,lastName,email,phone,createdAt)) // panggil class Person biar sesuai/kebaca parameternya
  }

  save(){
    var str =""
    for(let i=0; i<this._people.length; i++){
      // Object.values itu dipakai buat kembalikan sebuah object menjadi array, kemudian di join biar jadi string
      var valuesJoin=Object.values(this._people[i]).join(",") 
      str +=  valuesJoin + '\n' 
    }
    fs.writeFileSync('people.csv', str, 'utf8')
  }
}

var parser = new PersonParser('people.csv')
parser.convertAllPeople()
// kenapa dibawah dikurangi 1 terus ditambah 1, karena kalau nggak gitu nomer nya ke skip satu pas setelah nomer 200 jadi 202, harusnya 201
// trus parser.people.size ini untuk baca brapa banyaknya yg ada di get people() diatas
parser.addPerson(parser.people.size -1 + 1, "setia", "anggraeni", "test@mail.com", "243156724", new Date())
parser.save()
//size dibawah dikurangi 1 karena kalau enggak nanti kebacanya 202, karena baris pertama untuk id
// kebaca, makanya dikurangi 1
console.log(`There are ${parser.people.size-1} people in the file ${parser._file}.`)
// console.log pertama berhasil, tapi kalau bikin console.log lagi setelah data yg baru di add
// dibawahnya ada baris kosong. apa karena diatas yg di function save() ada '\n' karena ini buat bikin baris
// tapi kalau nggak ada '\n' csv nya jadi manjang kesamping semua
