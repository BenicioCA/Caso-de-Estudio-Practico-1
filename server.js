const express = require("express")
const app = express()
const { v4: uuidv4} = require('uuid');

app.set("view engine", "ejs")

app.use(express.static('public'));
app.use(express.json());

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


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
