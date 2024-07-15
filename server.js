const express = require("express");
const app = express();
const session = require('express-session');
const { v4: uuidv4} = require('uuid');
const methodOverride = require("method-override");

app.set("view engine", "ejs")

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(methodOverride("_method"));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

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
    const successMessage = req.session.successMessage;
    req.session.successMessage = null; 
    res.render("home", { notes, successMessage });
});

app.get("/createNota", (req, res) => {
    res.render("createNotas");
});

app.get("/editNota/:id", (req, res) => {
    const note = notes.find(note => note.id === req.params.id);
    if (note) {
        res.render("editarNotas", { note });
    } else {
        res.status(404).send("Nota no encontrada");
    }
});

app.post("/notas", (req, res) => {
    const { title, content, tags} = req.body;
    if (!title || !content){
        return res.status(400).send("El título y el contenido son obligatorios");
    }
    const newNote = {
        id: uuidv4(),
        title,
        content,
        creationDate: new Date().toLocaleDateString(),
        lastModifiedDate: new Date().toLocaleString(),
        tags: tags ? tags.split(",").map(tag => tag.trim()) : []
    };
    notes.push(newNote);
    req.session.successMessage = "¡Nota creada con éxito!";
    res.redirect("/");
});

app.put("/notas/:id", (req, res) => {
    const { title, content, tags } = req.body;
    if (!title || !content) {
        return res.status(400).send("El título y el contenido son obligatorios.");
    }

    const noteIndex = notes.findIndex(note => note.id === req.params.id);
    if (noteIndex !== -1) {
        notes[noteIndex] = {
            ...notes[noteIndex],
            title,
            content,
            lastModifiedDate: new Date().toLocaleString(),
            tags: tags ? tags.split(",").map(tag => tag.trim()) : []
        };
        res.redirect("/");
    } else {
        res.status(404).send("Nota no encontrada");
    }
});

app.delete("/notas/:id", (req, res) => {
    notes = notes.filter(note => note.id !== req.params.id);
    res.redirect("/");
});

app.get("/search", (req, res) => {
    const query = req.query.query.toLowerCase();
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(query) ||
            note.tags.some(tag => tag.toLowerCase().includes(query));
    });
    res.render("home", { notes: filteredNotes });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 