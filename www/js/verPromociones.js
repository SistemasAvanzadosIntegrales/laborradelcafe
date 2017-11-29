/**
 * mostrarCupones
 **/
function mostrarCupones() {
    
    $.ajax({
        url: ruta_generica,
        type: 'POST',
        data:{
            funcion: 'cuponesSucursal',
            idCliente: cliente
        },
        success:function(resp) {
            resp = JSON.parse(resp);
            var cupo = "";
            
            for(var i = 0; i <= resp.length - 1; i++) {
                
                if( resp[i].imagen != '' && resp[i].paraMapa == '1' )
                    cupo += "<div class='mt-4'><img onclick=\"modal('CP|"+resp[i].codigoQR+"')\" src='"+resp[i].imagen+"' width='100%'></div>";
            }
            
            $("#contenedorPromociones").html(cupo);
            
            $('#contenedorPromociones img').click(function() {
                $('html,body').animate({
                    scrollTop: $('#test').css('top')
                }, 800, function() {

                    $('html, body').animate({
                        scrollTop: 0
                    }, 800);

                });
            });
        }
    }); 
}

/**
 * mostrarCupones
 **/
function modal(a) {
    localStorage['cupon_tem'] = a;
    document.getElementById('light').style.display='block';
    document.getElementById('fade').style.display='block';
    $('.msg3').html(localStorage.getItem("cupon_tem"));
    $('#msg2').html(localStorage.getItem("cupon_tem"));
}

/**
 * cerrar_modal
 **/
function cerrar_modal() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
    document.getElementById('light2').style.display='none';
    document.getElementById('fade2').style.display='none';
}

/**
 * modal2
 **/
function modal2() {
    document.getElementById('light').style.display='none';
    document.getElementById('fade').style.display='none';
    document.getElementById('light2').style.display='block';
    document.getElementById('fade2').style.display='block';
    update_qrcode2('msg2');
}

/**
 * aceptar
 **/
function aceptar() {
    cerrar_modal();
}
