const express = require("express")
const app = express()
const { v4: uuidv4} = require('uuid');

app.set("view engine", "ejs")

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

let notes = [
    {
        id: uuidv4(),
        title: "Nota 1",
        content: "Contenido de la nota 1",
        creationDate: new Date().toLocaleString(),
        lastModifiedDate: new Date().toLocaleDateString(),
        tags: ["ejemplo", "nota"]
    }, 
    {
        id: uuidv4(),
        title: "Nota 2",
        content: "Contenido de la nota 2",
        creationDate: new Date().toLocaleTimeString(),
        lastModifiedDate: new Date().toLocaleString(),
        tags: ["test"]
    }
];

app.get("/", (req, res) => {
    res.render("home", {notes});
});

app.get("/createNota", (req, res) => {
    res.render("createNotas");
});

app.post("/notas", (req, res) => {
    const { title, content, tags} = req.body;
    const newNote = {
        id: uuidv4(),
        title,
        content,
        creationDate: new Date().toLocaleDateString(),
        lastModifiedDate: new Date().toLocaleString(),
        tags: tags.split(",").map(tag => tag.trim())
    };
    notes.push(newNote);
    res.redirect("/");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
