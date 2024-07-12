const express = require('express');
const bodyParser = require('body-parser');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api/notes', notesRouter);

app.listen(PORT, () =>{ 
    console.log('Server is running on http://localhost:${PORT}');
});