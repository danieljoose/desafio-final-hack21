const neDB = require('../configurations/database')
const api = {}

api.findAll = (request, response) => {
    neDB.find({}).sort({name: 1}).exec( (exception, cards) => {
        if(exception){
            console.log('Opa, deu ruim na tentiva de listar todos os cards', exception)
        }

        response.json(cards)
    })
}

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

// api.paginationAndSorting = (request, response) => {   
//     neDB.find({}).sort({address: }).exec((exception, card) => {
//         if(exception){
//             console.log('Opa, deu ruim na tentativa de inserir um card', exception)
//         }

//         response.json(card)
//         response.status(201)
//     })
// }

module.exports = api