var pughpharm = {};
var configuracionApp = {};

pughpharm.login = function(nombre, email, puntos, regla, codigo, ciudad, pais, estado) {
    
    try {
        localStorage.setItem('pughpharm', JSON.stringify({
            'nombre' : nombre,
            'email'  : email, 
            'puntos' : puntos, 
            'regla'  : regla,
            'codigo' : codigo,
            'ciudad' : ciudad,
            'pais'   : pais,
            'estado' : estado
        }));
        
        localStorage.setItem('cliente', email);
            
        //notificar_dispositivo();
        location.href = 'verPromocionesLogged.html';
        
    }
    catch(error) {
        //alert(error.message);
        return false;
    }
}

pughpharm.isLogged = function() {
    
    if(localStorage.getItem('pughpharm') != null) {
        return true;
    }
    else {
        return false;
    }
};

pughpharm.deleteToken = function() {
    try {
        localStorage.removeItem('pughpharm');
        location.href='index.html';
    }
    catch(error) {
        return false;
    }
};
