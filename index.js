const restify = require('restify');

const server = restify.createServer({
    name: 'myapp',
    version: '1.0.0'
});

//Teste!!!
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'u0zbt18wwjva9e0v.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'z9cktik1p3l98ftg',
        password: 'y01cmja132fth2b1',
        database: 'khuqwwy3v5bhoqqo'
    }
});

const errs = require('restify-errors');

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

const port = process.env.PORT;
server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});

//Pega por id
server.get('/positions', (req, res, next) => {

    knex('jobs').then((dados) => {
        res.send(dados);
    }, next)
});

server.get('/positions/:id', (req, res, next) => {
    const { id } = req.params;

    knex('jobs').where('id', id).first().then((dados) => {
        if (!dados) return res.send(new errs.BadRequestError('Nenhum registro encontrado'));
        res.send(dados);
    }, next)
});

//Procura os três juntos
server.get('/positions/search/:description/:full_time/:location', (req, res, next) => {
    var { description } = req.params;
    const { full_time } = req.params;
    const { location } = req.params;

    description = '%' + description + '%';

    knex('jobs').where('description', 'like', description).andWhere('full_time', full_time).andWhere('location', location)
        .then((dados) => {
            if (!dados) return res.send(new errs.BadRequestError('Nenhum registro encontrado'));
            res.send(dados);
        }, next)
});

//Procura descrição

server.get('/positions/description/:description', (req, res, next) => {
    var { description } = req.params;
    description = '%' + description + '%';

    knex('jobs').where('description', 'like', description).then((dados) => {
        if (!dados) return res.send(new errs.BadRequestError('Nenhum registro encontrado'));
        res.send(dados);
    }, next)
});

//Procura localização
server.get('/positions/location/:location', (req, res, next) => {
    const { location } = req.params;

    knex('jobs').where('location', location).then((dados) => {
        if (!dados) return res.send(new errs.BadRequestError('Nenhum registro encontrado'));
        res.send(dados);
    }, next)
});

//Procura full time 
server.get('/positions/fulltime/:full_time', (req, res, next) => {
    const { full_time } = req.params;

    knex('jobs').where('full_time', full_time).then((dados) => {
        if (!dados) return res.send(new errs.BadRequestError('Nenhum registro encontrado'));
        res.send(dados);
    }, next)
});