$(document).ready(function() {

    var registro = JSON.parse(localStorage.getItem('pughpharm'));
    
    $.ajax({
        url: ruta_generica,
        type: 'POST',
        data: {
            funcion: 'estadoCuenta',
            numeroTarjeta:localStorage['tarjeta'],
            idCliente: cliente
        },
        success:function(resp) {
            
            resp = JSON.parse(resp);
            
            jQuery.each(resp, function(i, val) {
                if( val.tipo == 'SumarPuntos' )
                    $("#tablaEstadoCuenta").append('<tr><td>'+val.fecha+'</td><td>$'+val.monto+'</td><td>'+val.saldoAnterior+' pts</td><td>'+val.saldoActual+' pts</td>');
                else
                    $("#tablaEstadoCuenta").append('<tr><td>'+val.fecha+'</td><td style="color:#f00;">- $'+val.monto+'</td><td>'+val.saldoAnterior+' pts</td><td>$'+val.saldoActual+' pts</td>');
            });
            
            puntos_consumidos();
        }
    }); 
});

function puntos_consumidos() {
    
     $.ajax({
         url: ruta_generica,
         type: 'POST',
         data: {
             funcion: 'puntosUsados',
             numeroTarjeta: localStorage['tarjeta'],
             idCliente: cliente
         },
         success:function(resp) {
             var aux = JSON.parse(resp);
             $('#p_cons').html(aux.puntos);
         },
         error: function (resp) {
             alert("error en puntos usado"+JSON.stringify(resp));
         }
    }); 
}