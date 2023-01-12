const express = require('express');
const path = require('path');
const app = express();

//configuração para suportar solicitação JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Implementando a API Books
const apiBook = require('./routes/bookAPI')

//app.use(express.static('assets'));

//redenrizar página inicial
const pagIndex = path.join(__dirname, '/assets/index.html')

app.get('/', (req, res)=>{
    //res.sendFile(pagIndex);
});

apiBook(app);

app.listen(8000, ()=>{
    console.log(`servidor rodando no link http://localhost:8000/`);
})