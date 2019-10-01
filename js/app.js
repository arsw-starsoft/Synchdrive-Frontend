  
app=(function(){

    
    // PROMESAS DEL REGISTRO
    var onSucessRegistro = function (data){
        alert("Ha sido registrado exitosamente");
        location.href = "login.html";
    }    

    var onErrorRegistro = function(data){
        alert("No se pudo realizar el registro correctamente");
        location.href = "";
    }

    return{
        /*
            FUNCIONES DE REGISTRO
        */
        addUser:function(name){
            var user = {
                "email": $('#correo').val(),
                "userName": $('#nombre').val(),
                "password": $('#contrasena').val(), 
            };
            console.log(user)
            user = JSON.stringify(user); //parsea a formato JSON
            return apiclient.registroUser(user, onSucessRegistro,
                onErrorRegistro);
        },
        
        registroConductor:function(name){
            var conductor = {
                "email": $('#correo').val(),
                "userName": $('#nombre').val(),
                "password": $('#contrasena').val(),
                "cellPhone": $('#cell').val(),				
            };
            console.log(conductor)
            conductor = JSON.stringify(conductor); //parsea a formato JSON
            return apiclient.registroConductor(conductor, onSucessRegistro,
                onErrorRegistro);
            
        }
    }
})();