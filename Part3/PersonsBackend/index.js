require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const Contact = require("./models/contact");
const app = express();

app.use(express.json());
app.use(express.static("dist"));

morgan.token("post", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :post"),
);

let people = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<p>:3</p>");
});

app.get("/info", (request, response) => {
  const time = Date();
  response.send(`
        <div>
            <p>Phonebook has info for ${people.length} people</p>
            <p>${time}</p>
        </div>`);
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((people) => {
    response.json(people);
  });
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Contact.findById(id).then((person) => {
    response.json(person);
  });
});

const generateId = () => {
  const range = 400;
  return String(Math.floor(Math.random() * range));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({ error: "name or number missing" });
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/persons/:id", (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => {
      if (result) {
        response.status(204).end();
      } else {
        response.status(404).json({ error: "contact not found" });
      }
    })
    .catch((error) => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
