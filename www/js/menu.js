var contador = 1;
 
$(document).ready(function(){
	$('#menus').click(function(e){
        e.stopPropagation();
        
		if (contador == 1) {
			$('nav').animate({
				left: '0'
			});
			
            contador = 0;
            
            $(".modal-background").removeClass('hidden');
		} 
        else {
			contador = 1;
			$('nav').animate({
				left: '-100%'
			});
            
             $(".modal-background").addClass('hidden');
		}
	});
});
 
function afuera() {
    contador = 1;
    $('nav').animate({
        left: '-100%'
    });

    $(".modal-background").addClass('hidden');
}

generar_menu("menu");

/**
 * generar_menu
 **/
function generar_menu(id) {
    
    $("#" + id).append(
        '<nav class="text-center" style="left: -100%">' + 
            '<div class="offset-2 col-8 text-center m-t-space"><img src="img/logo_blanco.png" width="100%"></div>' +

            '<div class="col-12 float-left mt-2 menu-items text-left"><img src="img/perfil.png" /><a href="miPerfil.html">Perfil</a></div>' +
        
            '<div class="col-12 float-left mt-2 menu-items text-left"><img src="img/promociones.png" /><a href="verPromocionesLogged.html">Promociones</a></div>' +
        
            '<div class="col-12 float-left mt-2 menu-items text-left"><img src="img/beneficio.png" /><a href="misDatos.html">Mis datos</a></div>' +
            
            '<div class="col-12 float-left text-right acerca mt-3"><a href="acercaDe.html">Acerca de esta app</a></div>'+
            
            '<div class="col-12 float-left mt-4 text-center"><a href="#" style="cursor: pointer;" onclick="javascript:salir();">Salir<a/></div>' +
		'</nav>'
    );
}
