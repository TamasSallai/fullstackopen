const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tamassallaihu:${password}@cluster0.nzaoqkk.mongodb.net/phonebook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
})

const Entry = mongoose.model('Entry', entrySchema)

if (process.argv.length === 3) {
  Entry.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((entry) => {
      console.log(`${entry.name} ${entry.phoneNumber}`)
    })
    mongoose.connection.close()
  })
}

if (process.argv.length === 5) {
  const entry = new Entry({
    name: process.argv[3],
    phoneNumber: process.argv[4],
  })

  entry.save().then(({ name, phoneNumber }) => {
    console.log(`added ${name} number ${phoneNumber} to phonebook`)
    mongoose.connection.close()
  })
}
