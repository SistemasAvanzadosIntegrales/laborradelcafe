var ruta_generica = "http://admin.lealtadprimero.com.mx/servicio/index.php";
var cliente = '4';

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : Document ready
 **/
$( document ).ready(function() {
    
    if( localStorage.getItem('pughpharm') !== null ) {
        refrescar();
    }
    
    ver_cliente();    
});

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : refrescar
 **/
function refrescar() {
    
    var registro = JSON.parse(localStorage.getItem('pughpharm'));
    
    try {
        $("#lblNombre").html(registro.nombre);
        $("#lblPuntos").html(registro.puntos);
        $("#userLocation").html(registro.ciudad+', '+registro.estado);
        //console.log(registro);
    }
    catch(er){
        console.log(er);
    }   
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : ver_cliente
 **/
function ver_cliente() {
    
    var configApp = JSON.parse(localStorage.getItem('configuracionApp'));
    
    if( configApp == null ) {
        $.ajax({
            method: 'POST',
            url: ruta_generica,
            dataType: 'JSON',
            data: {
                funcion:'configuracion',
                idCliente: cliente  
            },
            success: function(data){
                localStorage.setItem("configuracionApp", JSON.stringify(data));

            },
            error: function (er) {
                console.log(er);
            }   
        });
    }
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : ingresar
 **/
function ingresar() {
    
    if( $("#numero_tarjeta").val().trim() == '' ) {
        $("#alertaLogin").html("Debes escribir tu usuario").show();
    }
    else if( $("#contrasena").val().trim()=='' ) {
        $("#alertaLogin").html("Debes escribir tu contarseña").show();
    }
    else {
        
        $("#alertaLogin").html("").hide();
        
        $.ajax({
            url: ruta_generica,
            type: 'POST',
            dataType: 'JSON',
            data:{
                funcion       : 'ingreso',
                idCliente     : cliente,
                numeroTarjeta : $("#numero_tarjeta").val().trim(),
                password      : $("#contrasena").val().trim()
            },
            success:function(resp) {
                
                if( resp.error == '' ) {
                    localStorage.setItem('seLogueo', '1');
                    localStorage.setItem('tarjeta', resp.numeroTarjeta);
                    pughpharm.login(resp.nombre, resp.email, resp.puntos, resp.puntosPorPeso, resp.codigo, resp.ciudad, resp.pais, resp.estado);
                }
                else {
                    $("#alertaLogin").html(resp.error).show();
                }
            }
        });
    }
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : recuperarContrasena
 **/
function recuperarContrasena() {
    
    if( $("#email").val().trim()=='' ) {
        $("#alertaLogin").html("Debes escribir tu email").show();
    }
    else {
        $("#alertaLogin").html("").hide();
        
        $.ajax({
            url: ruta_generica,
            type: 'POST',
            dataType: 'JSON',
            data: {
                funcion   : 'recuperarContrasena',
                idCliente : cliente,
                email     : $("#email").val().trim()
            },
            success:function(resp) {
                    
                if( resp.error == '' ) {
                    $("#alertaLogin").html("Su contraseña ha sido ha enviada por correo electrónico.");
                    location.href = "login.html";
                }
                else {
                    $("#alertaLogin").html(resp.error).show();
                }
            }
        });
    }
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : obtenerDatosPersonales
 **/
function obtenerDatosPersonales() {
        
    $.ajax({
        url: ruta_generica,
        type: 'POST',
        dataType: 'JSON',
        data: {
            funcion       : 'perfil', 
            idCliente     : cliente, 
            numeroTarjeta : localStorage['tarjeta']
        },
        success:function(resp) { 
            
            if( resp.error == '' ) {
                
                $("#txtTarjeta").val(localStorage['tarjeta']);    
                $("#txtNombre").val(resp.nombre);
                $("#txtSexo").val(resp.sexo);
                $("#txtCumple").val(resp.nacimiento);
                $("#txtCorreo").val(resp.email); 
                $("#txtTelefono").val(resp.telefonoTrabajo); 
                $("#txtEstado").val(resp.idEstado); 
                $("#txtColonia").val(resp.colonia); 
                $("#txtMunicipio").val(resp.idMunicipio);
                $("#txtCp").val(resp.cp);
                $("#txtpass").val(resp.password);  
                $("#txtTelefono2").val(resp.telefonoHogar);
                
                $.ajax({
                    url: ruta_generica,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        funcion   : 'municipios',
                        idCliente : cliente,
                        idEstado  : resp.idEstado
                    },  
                    success:function(re) {
                        
                        var d = document.getElementById('txtMunicipio');
                        
                        while(d.hasChildNodes())
                            d.removeChild(d.firstChild);
                        
                        for(var i = 0; i < re.length; i++){
                            if( re[i].id == resp.idMunicipio ){
                                $('#txtMunicipio').append('<option value="'+re[i].id+'">'+re[i].nombre+'</option>')
                            }
                        }
                    },
                    error: function(re){
                        console.log(re);
                    }
                });
            }
            else {
                alert("error:"+resp.error);
            }
        }
    });
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : salir
 **/
function salir() {
    localStorage.removeItem("cliente");
    pughpharm.deleteToken();
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : pre_registro
 * @desc     : Función para registrar usuarios.
 **/
function pre_registro(){
    
    if( $('#nombre').val() == "" || $('#email').val() == "" || $('#telefono').val()=="" ) {
        $("#alertaRegistro").html('Verifique que todos los campos esten llenos.').show();
    }
    else {
        $.ajax({
            method: 'POST',
            url: ruta_generica,
            dataType: 'JSON',
            data: {
                funcion         : 'preregistro',
                idCliente       : cliente,
                nombre          : $('#nombre').val(),
                email           : $('#email').val(),
                sexo            : $('#sexo').val(),
                fechaNacimiento : $('#fec_nac').val()
            },
            success: function(data){
                
                if( data.error != '' ){
                    $("#alertaRegistro").html('Este correo electronico ya esta registrado.').show();
                }
                else if ( localStorage.getItem('codigo_qr') ) {
                    window.location = "QRpreregistro.html";
                }
                else {
                    var cadena = "PR|"+data.codigo;
                    localStorage.setItem('codigo_qr', cadena);
                    window.location = "QRpreregistro.html";   
                }
            },error: function (err){
                $("#alertaRegistro").html('Erro en el pre-registro '+JSON.stringify(err)).show();
            }
        });
    }
}

/**
 * @author   : Avansys
 * @date     : 09/11/2017
 * @lastmove : Danny Ramírez
 * @date     : 09/11/2017
 * @function : guardar_datos
 * @desc     : Función para registrar usuarios.
 **/
function guardar_datos() {
   
    if( $('#politicas').is(':checked') ){
        $.ajax({
            url: ruta_generica,
            type: 'POST',
            dataType: 'JSON',
            data: {
                funcion         : 'actualiza',
                idCliente       : cliente,
                password        : $('#txtpass').val(),
                numeroTarjeta   : $('#txtTarjeta').val(),
                nombre          : $('#txtNombre').val(),
                idIndustria     : "",
                sexo            : $('#txtSexo').val(),
                email           : $('#txtCorreo').val(),
                direccion       : "Arrollo seco 1300.",
                colonia         : $('#txtColonia').val(),
                idEstado        : $('#txtEstado').val(),
                idMunicipio     : $('#txtMunicipio').val(),
                cp              : $('#txtCp').val(),
                nacimiento      : $('#txtCumple').val(),
                estadoCivil     : "",
                telefonoTrabajo : $('#txtTelefono').val(),
                telefonoHogar   : $('#txtTelefono2').val(),
                tipoCelular     : "",
                facebook        : "...",
                twitter         : "..."
            },
            success: function(re) {
                       
                localStorage['verifica'] = 2;
                
                $.ajax({
                    url:ruta_generica,
                    type: 'POST',
                    dataType: 'JSON',
                    data: {
                        funcion       : 'ingreso',
                        idCliente     : cliente,
                        numeroTarjeta : $('#txtTarjeta').val().trim(), 
                        password      : $('#txtpass').val().trim()},
                    success:function(resp) {
                        
                        if( resp.error == '' ) {
                            pughpharm.login(resp.nombre, resp.email, resp.puntos, resp.puntosPorPeso, resp.codigo, resp.ciudad, resp.pais, resp.estado);
                            window.location = "miPerfil.html"
                        }
                        else {
                            $("#alertaLogin").html(resp.error).show();
                        }
                    },
                   error: function(re){
                       console.log(re);
                   }
                });
            },
            error: function(re){
                console.log(re);
            }
        });
    } 
    else {
        $("#alertaRegistro").html('Debes aceptar las politicas de privacidad para continuar.').show();
    }     
}

function estados(){
       $.ajax({
           url:ruta_generica,
           type: 'POST',
           data: {
               funcion: 'estados',
               idCliente:cliente
           },
           processData: true,
           dataType: "json",
           success:function(re){
              // alert("Estados : "+re.length);
              for(var i = 0; i < re.length; i++){
                   $('#txtEstado').append('<option value="'+re[i].id+'">'+re[i].nombre+'</option>')
              }
           },
           error: function(re){
               alert("Error al comunicarse con servidor.");
           }
       });
}


function municipios(){
        var est = $('#txtEstado').val();
    //if($('#txtEstado').val() == ""){
    //alert(est);
           $.ajax({
               url:ruta_generica,
               type: 'POST',
               data: {
                  funcion:  'municipios',
                  idCliente:cliente,
                  idEstado: est

               },
               processData: true,
               dataType: "json",
               success:function(re){
                  // alert(JSON.stringify(re));
                   var d = document.getElementById('txtMunicipio');
                    while(d.hasChildNodes())
                    d.removeChild(d.firstChild);
                   for(var i = 0; i < re.length; i++){
                       $('#txtMunicipio').append('<option value="'+re[i].id+'">'+re[i].nombre+'</option>')
                  }
               },
               error: function(re){
                   alert("Error al comunicarse con servidor.");
               }
           });
       //  }
}
