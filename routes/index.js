var express = require('express');
var router = express.Router();
let CCDAO = require('../models/CentroCostoDAO');

//Esta funcion te manda a la pagina de logue 
router.get('/', function (req, res, next) {
  CCDAO.obtenerTodasUnidades((data) => {
    centroCosto = data;
    //console.log(centroCosto);
    res.render('main',{centroCosto : centroCosto});
  });
});

//Esta funcion te manda a la pagina principal,
//Donde se muestran todas las unidades en una tabla dinamica
router.post('/irMain', function (req, res, next) {
  res.render('main');
});

//Esta funcion te manda a la pagina donde pueden ver la informacion la informacion del usuario
//Donde tambien pueden modificar sus informacion
router.post('/irProfile', function (req, res, next) {
  res.render('main');
});

//Esta funcion te manda a la pagina donde se muestra la ifnormacion de la pagian
//Objetivo, versione y desarrolladores (Firma)
router.post('/irAbout', function (req, res, next) {
  res.render('main');
});

//Esta funcion te manda a la pagian de logueo desde las pagians del sistema
router.post('/irLogin', function (req, res, next) {
  res.render('main');
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
  let {UDN} = req.body;
  console.log(UDN)
  res.render('main');
});


module.exports = router;