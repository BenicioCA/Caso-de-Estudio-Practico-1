const express = require("express")
const app = express()

app.set("view engine", "ejs")

app.get("/", (req, res) => {
    console.log("Running on port: 3000")
    res.render("index")
})


app.listen(3000)
