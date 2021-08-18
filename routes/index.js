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

//Si se quiere entrar al sistema con el link primero le pedira que se logue
router.get('/*', function (req, res, next) {
  res.render('login');
});

//Manda a llamar el login cuando el usuarios quiere salir del sistema
router.get('/irLogin', function (req, res, next) {
  res.render('login');
});

//Se manda a llamar cuando la vista esta en construccion
router.post('/enConstruccion', function (req, res, next) {
  res.render('construccion');
});


//Madnamos a llamar la pantalla de los centros de costo
router.post('/verListaCentrosCosto', function (req, res, next) {
  //Recuperamos el Id del usuario en la pantalla
  let {
    IdUsuario
  } = req.body;

  //Obtenemos el Usuario para tener de referencia en la pantalla
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    let usuario = data;
    console.log(usuario)
    //Obtenemos todos los centros de cosostos
    CCDAO.obtenerTodasUnidades((data) => {
      listaCentrosCosotos = data;
      //Rendirizamos la pantalla de lista de centros de costo
      res.render('administracion/listas/listaCentroCostos', {
        listaCentrosCosotos: listaCentrosCosotos,
        usuario: usuario
      });
    });
  });
});


//Madnamos a llamar la pantalla para ver un solo centro de costo
router.post('/verCentroCosto', function (req, res, next) {
  //Recuperamos el Id del usuario y del centro de costo para capturar en la pantalla
  let {
    IdCentroCosto,
    IdUsuario
  } = req.body;
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    let usuario = data;
    console.log(usuario);

    CCDAO.obtenerCentroCostoID(IdCentroCosto, (data) => {
      let centroCosto = data;
      console.log(centroCosto);

      empresaDAO.obtenerTodasEmpresas((data) => {
        let listaEmpresas = data
        console.log(listaEmpresas);

        franquiciaDAO.obtenerTodasFranquicias((data) => {
          let listaFranquicias = data;
          console.log(listaFranquicias);

          tipoUnidad.obtenerTodosTipoUnidad((data) => {
            let listaTipoUnidades = data;
            console.log(listaTipoUnidades);
            res.render('administracion/unosolo/verUnCentroCosto', {
              usuario: usuario,
              centroCosto: centroCosto,
              listaEmpresas: listaEmpresas,
              listaFranquicias: listaFranquicias,
              listaTipoUnidades: listaTipoUnidades,
              tipoMensaje : 0
            });
          });
        });
      });
    });
  });
});


//Madnamos a llamar la pantalla de las empresas
router.post('/verListaEmpresas', function (req, res, next) {
  //Recuperamos el Id del usuario en la pantalla
  let {
    IdUsuario
  } = req.body;
  //Obtenemos el Usuario para tener de referencia en la pantalla    
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    usuario = data;
    //Obtenemos todas las empresas
    empresaDAO.obtenerTodasEmpresas((data) => {
      listaEmpresas = data;
      //Rendirizamos la pantalla de lista de empresas
      res.render('administracion/listas/listaEmpresas', {
        listaEmpresas: listaEmpresas,
        usuario: usuario
      });
    });
  });
});


//Madnamos a llamar la pantalla de las franquicias
router.post('/verListaFranquicias', function (req, res, next) {
  //Recuperamos el Id del usuario en la pantalla
  let {
    IdUsuario
  } = req.body;
  //Obtenemos el Usuario para tener de referencia en la pantalla
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    usuario = data;
    //Obtenemos todas las franquicias    
    franquiciaDAO.obtenerTodasFranquicias((data) => {
      listaFranquicia = data;
      //Rendirizamos la pantalla de lista de franquicias
      res.render('administracion/listas/listaFranquicias', {
        listaFranquicia: listaFranquicia,
        usuario: usuario
      });
    });
  });
});

//Madnamos a llamar la pantalla de tipo unidad
router.post('/verListaTipoUnidad', function (req, res, next) {
  //Recuperamos el Id del usuario en la pantalla
  let {
    IdUsuario
  } = req.body;
  //Obtenemos el Usuario para tener de referencia en la pantalla
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    usuario = data;
    //Obtenemos todas los tipos de unidad 
    tipoUnidad.obtenerTodosTipoUnidad((data) => {
      listaTipoUnidad = data;
      //Rendirizamos la pantalla de lista de tipos de unidad
      res.render('administracion/listas/listaTipoUnidades', {
        listaTipoUnidad: listaTipoUnidad,
        usuario: usuario
      });
    });
  });
});

//Madnamos a llamar la pantalla de lista de usuarios
router.post('/verListaUsuarios', function (req, res, next) {
  //Recuperamos el Id del usuario en la pantalla
  let {
    IdUsuario
  } = req.body;
  //Obtenemos el Usuario para tener de referencia en la pantalla
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    usuario = data;
    //Obtenemos todas los usuarios
    UsuarioDAO.obtenerTodosUsuarios((data) => {
      listaUsuarios = data;
      //Rendirizamos la pantalla de lista de lista de usuarios
      res.render('administracion/listas/listaUsuarios', {
        listaUsuarios: listaUsuarios,
        usuario: usuario
      });
    });
  });
});

//Fucion que permite hacer el laamado de logue del usuario
router.post('/logueo', async function (req, res, next) {
  //Obtenemos el nombre de usuario y la contraseña para buscarlo en el sistema
  let {
    username /*Nombre del usuario*/ ,
    password /*Contraseña del usuario*/
  } = req.body;
  //Incriptamos la contraseña del ususairo
  let passwordincriptado = md5(password);
  //Funcion que manda a llamar el logue en la base de datos
  UsuarioDAO.logueo(username, passwordincriptado, (data) => {
    usuario = data;
    console.log(usuario);
    //Valida si el usuario existe en la base de datos
    if (usuario == null) {
      //Si el usuario no existe se regresa al login con un mensaje indicando
      //Acceso denegado
      res.render('login', {
        acceso: false
      });
    } else {
      //Si el usuario existe te manda a la pagina principal mostrando
      //Todos los centros de costo
      CCDAO.obtenerTodasUnidades((data) => {
        listaCentrosCosotos = data;
        res.render('administracion/listas/listaCentroCostos', {
          listaCentrosCosotos: listaCentrosCosotos,
          usuario: usuario
        });
      });
    }
  });
});

router.post("/miPerfil", function (req, res, next) {
  //Obtenemos el nombre de usuario y la contraseña para buscarlo en el sistema
  let {
    IdUsuario
  } = req.body;
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    let usuario = data;
    console.log(usuario);
    res.render('miPerfil', {
      usuario: usuario
    });
  });

});

router.post('/guardarCentroCosto', function (req, res, next) {
  console.log("Iniciando guardado");
  let {
    IdUsuario,
    IdCentroCosto,
    UDN,
    IdEmpresa,
    IdFranquicia,
    IdTipoUnidad,
    nombreCentroCosto,
    nombreGerente,
    mailGerente,
    nombresubGerente,
    telefono,
    estado,
    ciudad,
    direccion,
    numeroInterior,
    numeroExterior,
    colonia,
    CP,
    status
  } = req.body;
  console.log("Desde la vista " + status)
  CCDAO.guardarDatosCentroCosto2(IdCentroCosto, UDN, IdEmpresa, IdFranquicia,
    IdTipoUnidad,
    nombreCentroCosto,
    nombreGerente,
    mailGerente,
    nombresubGerente,
    telefono,
    estado,
    ciudad,
    direccion,
    numeroInterior,
    numeroExterior,
    colonia,
    CP,
    status,
    (data) => {
      IdCentroCosto = data.IdTemp;
      let tipoMensaje;
      if(data){
        tipoMensaje = 1;
      }else{
        tipoMensaje = 2;
      }
      //console.log(respuesta);
      UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
        let usuario = data;
        console.log(usuario);
    
        CCDAO.obtenerCentroCostoID(IdCentroCosto, (data) => {
          let centroCosto = data;
          console.log(centroCosto);
    
          empresaDAO.obtenerTodasEmpresas((data) => {
            let listaEmpresas = data
            console.log(listaEmpresas);
    
            franquiciaDAO.obtenerTodasFranquicias((data) => {
              let listaFranquicias = data;
              console.log(listaFranquicias);
    
              tipoUnidad.obtenerTodosTipoUnidad((data) => {
                let listaTipoUnidades = data;
                console.log(listaTipoUnidades);
                res.render('administracion/unosolo/verUnCentroCosto', {
                  usuario: usuario,
                  centroCosto: centroCosto,
                  listaEmpresas: listaEmpresas,
                  listaFranquicias: listaFranquicias,
                  listaTipoUnidades: listaTipoUnidades,
                  tipoMensaje:tipoMensaje
                });
              });
            });
          });
        });
      });
    }
  );

});


router.post('/nuevoCentroCosto', function (req, res, next) {
  console.log("Iniciando nuevo")
  let {
    IdUsuario
  } = req.body;
  let centroCosto = {
    idCentroCosto: 0,
    UDN:'',
    IdEmpresa:0,
    IdFranquicia:0,
    IdTipoUnidad:0,
    nombreCentroCosto:'',
    nombreGerente:'',
    mailGerente:'',
    nombresubGerente:'',
    telefono:'',
    estado:'',
    ciudad:'',
    direccion:'',
    numeroInterior:'',
    numeroExterior:'',
    colonia:'',
    CP:'',
    status : true
  };
  UsuarioDAO.obtenerUsuarioPorId(IdUsuario, (data) => {
    let usuario = data;
    console.log(usuario);
      empresaDAO.obtenerTodasEmpresas((data) => {
        let listaEmpresas = data
        console.log(listaEmpresas);

        franquiciaDAO.obtenerTodasFranquicias((data) => {
          let listaFranquicias = data;
          console.log(listaFranquicias);

          tipoUnidad.obtenerTodosTipoUnidad((data) => {
            let listaTipoUnidades = data;
            console.log(listaTipoUnidades);
            res.render('administracion/unosolo/verUnCentroCosto', {
              usuario: usuario,
              centroCosto: centroCosto,
              listaEmpresas: listaEmpresas,
              listaFranquicias: listaFranquicias,
              listaTipoUnidades: listaTipoUnidades,
              tipoMensaje : 0
            });
          });
        });
      });
    
  });
});

module.exports = router;