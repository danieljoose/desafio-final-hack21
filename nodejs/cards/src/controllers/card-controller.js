const neDB = require('../configurations/database')
const api = {}

/* O método findAll retorna todos os cartões já cadastrados e lista por ordem alfabetica do Customer Name */
api.findAll = (request, response) => {
    neDB.find({}).sort({customerName: 1}).exec( (exception, cards) => {
        if(exception){
            console.log('Opa, deu ruim na tentiva de listar todos os cards', exception)
        }

        response.json(cards)
    })
}

/* O método save adiciona um novo cartão na lista */
api.save = (request, response) => {
    const canonical = request.body

    neDB.insert(canonical, (exception, card) => {
        if(exception){
            console.log('Opa, deu errado a tentativa de inserir um card', exception)
        }

        response.json(card)
        response.status(201)
    })
}

/* O método del remove um cartão já cadastrado do banco de dados*/
api.del = (request, response) =>{
    neDB.remove({_id: request.params.id}, {}, (exception, numRemoved) =>{
        if (exception) {
            const setence = 'Opa, deu errado a tentativa de remover card!'
            console.log(setence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        response.status(410)
        response.json(numRemoved)
    })
}

/* O método findById retorna um cartão já cadastrado a partir da ID passada */
api.findById = (request, response) =>{
    neDB.findOne({_id: request.params.id}, (exception, card)=> {
        if (exception) {
            const setence = 'Opa, deu errado a tentativa de achar um card pelo ID!'
            console.log(setence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        response.status(201)
        response.json(card)
    })
}

/* O método update faz a atualização dos dados passados no body
   ***Obs: Apenas os parametros passados serão alterados, não necessitando passar todo o body. */
api.update = (request, response) => {
    const body = request.body
     neDB.update({_id: request.params.id}, {$set: body}, {}, (exception, card) =>{
        if (exception) {
            const setence = 'Opa, deu ruim a tentativa de atualizar um card!'
            console.log(setence, exception)
            response.status(exception.status | 400)
            response.json({ 'mensagem': setence })
        }
        response.status(202)
        response.json(card)
     })
}


module.exports = api