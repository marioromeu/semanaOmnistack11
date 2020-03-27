const express = require ('express');
const express = require ('cors');

const app = express();

const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(routes);
/**
 *************** Tipos de requests ******************
 * GET : obter dados do recurso
 * POST : salvar dados no recurso
 * PUT : alterar dados no recurso
 * DELETE : remover dados no recurso
 * 
 * *************** Tipos de parametros ******************
 * QUERY : parametro via URL
 * ROUTE : parametro no recurso
 * BODY : Corpo da request, geralmente via json
 */



app.listen(3333);
