var express = require('express');
var router = express.Router();
let CCDAO = require('../models/CentroCostoDAO');
let UsuarioDAO = require('../models/UsuariosDAO');
let franquiciaDAO = require('../models/FranquiciasDAO');
let empresaDAO = require('../models/EmpresaDAO');
let tipoUnidad = require('../models/TipoUnidad');
var md5 = require("md5");

//Esta funcion te manda a la pagina de logue 
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/*', function (req, res, next) {
  res.render('login');
});


router.get('/irLogin', function (req, res, next) {
  res.render('login');
});

router.post('/irMain', function (req, res, next) {
  let {
    Id
  } = req.body;

  UsuarioDAO.obtenerUsuarioPorId(Id, (data) => {
    usuario = data;
    CCDAO.obtenerTodasUnidades((data) => {
      listaUsuarios = data;

      res.render('main', {
        listaUsuarios: listaUsuarios,
        usuario: usuario
      });
    });
  });
});



router.post('/verListaUsuarios', function (req, res, next) {
  let {
    Id
  } = req.body;

  UsuarioDAO.obtenerUsuarioPorId(Id, (data) => {
    usuario = data;
    UsuarioDAO.obtenerTodosUsuarios((data) => {
      listaUsuarios = data;
      res.render('verUsuarios', {
        listaUsuarios: listaUsuarios,
        usuario: usuario
      });
    });
  });
});

router.post('/verListaCentrosCosto', function (req, res, next) {
  let {
    Id
  } = req.body;

  UsuarioDAO.obtenerUsuarioPorId(Id, (data) => {
    usuario = data;
    UsuarioDAO.obtenerTodosUsuarios((data) => {
      listaFranquicias = data;

      res.render('main', {
        listaFranquicias: listaFranquicias,
        usuario: usuario
      });
    });
  });
});

router.post('/verListaFranquicias', function (req, res, next) {
  let {
    Id
  } = req.body;

  UsuarioDAO.obtenerUsuarioPorId(Id, (data) => {
    usuario = data;
   
    franquiciaDAO.obtenerTodasFranquicias((data) =>{
      listaFranquicia = data;

      res.render('verFranquicias', {
        listaFranquicia: listaFranquicia,
        usuario: usuario
      });
    });
  });
});

router.post('/verListaEmpresas', function (req, res, next) {
  let {
    Id
  } = req.body;
  

  
  UsuarioDAO.obtenerUsuarioPorId(Id, (data) => {
    usuario = data;
    empresaDAO.obtenerTodasEmpresas((data) => {
      listaEmpresas = data;
      
      res.render('verEmpresas', {
        listaEmpresas: listaEmpresas,
        usuario: usuario
      });
    });
  });
});

router.post('/verListaTipoUnidad', function (req, res, next) {
  let {
    Id
  } = req.body;
  

  
  UsuarioDAO.obtenerUsuarioPorId(Id, (data) => {
    usuario = data;
    tipoUnidad.obtenerTodosTipoUnidad((data) => {
      listaTipoUnidad = data;
      res.render('verTipoUnidad', {
        listaTipoUnidad: listaTipoUnidad,
        usuario: usuario
      });
    });
  });
});

//Fucion que permite hacer el laamado de logue del usuario
router.post('/logueo', async function (req, res, next) {

  let {
    username,
    password
  } = req.body;

  let passwordincriptado = md5(password);

  UsuarioDAO.logueo(username, passwordincriptado, (data) => {
    usuario = data;

    if (usuario == null) {
      res.render('login', {
        acceso: false
      });
    } else {
      CCDAO.obtenerTodasUnidades((data) => {
        centroCosto = data;
        res.render('main', {
          centroCosto: centroCosto,
          usuario: usuario
        });
      });
    }
  });
});

module.exports = router;