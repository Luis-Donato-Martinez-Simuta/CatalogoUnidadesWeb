var express = require('express');
var router = express.Router();
let CCDAO = require('../models/CentroCostoDAO');
let UsuarioDAO = require('../models/UsuariosDAO');
var md5 = require("md5");

//Esta funcion te manda a la pagina de logue 
router.get('/', function (req, res, next) {
  res.render('login');
});

router.get('/*', function (req, res, next) {
  res.render('login');
});

//Esta funcion te manda a la pagina principal,
//Donde se muestran todas las unidades en una tabla dinamica
router.post('/irMain', function (req, res, next) {
  res.render('main');
});

//Esta funcion te manda a la pagina donde pueden ver la informacion la informacion del usuario
//Donde tambien pueden modificar sus informacion
router.post('/irProfile', function (req, res, next) {
  res.render('construccion');
});

//Esta funcion te manda a la pagina donde se muestra la ifnormacion de la pagian
//Objetivo, versione y desarrolladores (Firma)
router.post('/irAbout', function (req, res, next) {
  res.render('construccion');
});

//Esta funcion te manda a la pagian de logueo desde las pagians del sistema
router.post('/irLogin', function (req, res, next) {
  res.render('login');
});

//Esta funcion tiene como proposito buscar las unidades que el usuario ingresa
//En su buscador desde la pagina principal
router.post('/buscarUnidad', function (req, res, next) {
  res.render('main');
});

//Esta funcion te dirigue a una pagina donde esta la informacion de la unidad que el usuario desidio ver
//Si el usuario tiene probilegios podra actualisar o agregar nuevas unidades
//De no tener pribilegios solo podra ver la informacion
router.post('/verUnidad', function (req, res, next) {
  let {
    UDN
  } = req.body;
  //console.log(UDN)
  res.render('construccion');
});


router.post('/logueo', async function (req, res, next) {
  console.log("Pss")
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