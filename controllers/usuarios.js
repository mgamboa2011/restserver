const { response, request } = require('express');
const Usuario = require('../models/usuario');
const encriptado = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {
    //http://localhost:8080/api/usuarios?q=aksjdajs&nombre=Mauro
    //los parametros q muestra ().. tmbn se puede
    //const params = req.query;
    //const { q, nombre = 'no name', apikey, limit, page = 1 } = req.query;
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true }
    //ejecuta ambas promesas.
    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //encriptado de contraseña con bcryptjs
    const salt = encriptado.genSaltSync();
    usuario.password = encriptado.hashSync(password, salt);

    //grabar registro en bd
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    //obtener datos
    const { id } = req.params; //req.params.id viene de routers
    const { _id, password, google, correo, ...resto } = req.body; //quito lo que no quiero cambiar del body

    //TODO: validar contra bd
    if (password) {
        const salt = encriptado.genSaltSync();
        resto.password = encriptado.hashSync(password, salt);
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        usuario
    });
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controlador'
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    const uid = req.uid;
    //borrar fisicamente
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}