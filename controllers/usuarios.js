const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {
    //http://localhost:8080/api/usuarios?q=aksjdajs&nombre=Mauro
    //los parametros q muestra ().. tmbn se puede
    //const params = req.query;
    const {q, nombre = 'no name', apikey, limit, page = 1} = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        apikey,
        limit,
        page
    });
}

const usuariosPost = (req, res = response) => {
    //leer del body de html
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res = response) => {
    //obtener datos
    const { id } = req.params; //req.params.id viene de routers

    res.json({
        msg: 'put API - controlador',
        id
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}