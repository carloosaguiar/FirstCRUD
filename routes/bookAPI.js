const path = require('path');
const fs = require('fs');

//caminho do arquivo de lista dos livros
const database = path.join(__dirname, '../database/booklist.json');

const cadastarLivro = (list, livro) =>{

    let livroEncontrado = () => {
        for(const key in list){
            if(list[key].LivroNome === livro.LivroNome){
                return true
            }
        }

        return false;
    }

    if(livroEncontrado()){
        return 'Livro já foi cadastrado!';
    }else{
        list.push(livro);

        fs.writeFileSync(
            database, 
            JSON.stringify(list),
            'utf8'
        );

        return 'Livro cadastrado com sucesso!';
    }
}
const apiBook = (app) =>{
    app.route('/books')
        .get((req,res)=>{
            let ListaLivros;
            try {
                ListaLivros = JSON.parse(fs.readFileSync(database,'utf8'));
                res.status(200).json(ListaLivros);
            }catch(err){
                res.status(400).json({menssage: "Livros não encontrados"});
            }
        })

        .post( (req,res)=>{

            let reqData = req.body;

            let ListaLivros;

            try {
                ListaLivros = JSON.parse(fs.readFileSync(database,'utf8'));
            }catch(err){
                ListaLivros = [];
            }

            let cadastreLivro = cadastarLivro(ListaLivros, reqData);

            res.send([cadastreLivro])
        })

        .put((req,res)=>{
            let {LivroNome, author} = req.body

            let listaLivros = JSON.parse(fs.readFileSync(database,'utf8'));

            listaLivros.forEach((object, index) => {

                if(object.LivroNome == LivroNome){
                    listaLivros[index].author = author;
                }
            })

            fs.writeFileSync(
                database, 
                JSON.stringify(listaLivros),
                'utf8'
            );
            
            res.sendStatus(200);
        })

        .delete((req,res)=>{
            let {LivroNome} = req.body;

            let listaLivros = JSON.parse(fs.readFileSync(database,'utf8'));

            let novaListaLivros = listaLivros.filter(Element => Element.LivroNome != LivroNome);

            fs.writeFileSync(
                database, 
                JSON.stringify(novaListaLivros),
                'utf8'
            );

            res.sendStatus(200);
        })
}

module.exports = apiBook;