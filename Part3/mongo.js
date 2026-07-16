const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

let nameAndNumberBool = false;
let name = "default";
let number = "test";

if (process.argv.length == 5) {
  nameAndNumberBool = true;
  name = process.argv[3];
  number = process.argv[4];
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.jh5brx9.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url, { family: 4 });

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

if (nameAndNumberBool) {
  const contact = new Contact({
    name: name,
    number: number,
  });

  contact.save().then((result) => {
    console.log("contact saved!");
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then((result) => {
    result.forEach((note) => {
      console.log(note);
    });
    mongoose.connection.close();
  });
}
