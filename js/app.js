  
var token;
app = (function () {
    // PROMESAS DEL REGISTRO
    var onSucessRegistro = function (data) {
        alert("Ha sido registrado exitosamente");
        location.href = "login.html";
    }
    var onSucessLoing = function (data) {
        alert("Ha sido Login exitosamente");
        location.href = "perfilUser.html";
        
    }
    var onErrorLogin = function (data) {
        alert("No se pudo realizar el login correctamente");
        
    }

    var onErrorRegistro = function (data) {
        alert("No se pudo realizar el registro correctamente");
        location.href = "";
    }

    return {
        /*
            FUNCIONES DE LOGIN
        */
       login:function (name){
        var loginData = {
            "username": $('#correo').val(),
            "password": $('#contrasena').val(),
        };
        loginData = JSON.stringify(loginData);
        console.log(loginData)
        console.log(loginData)
        console.log(loginData)
        return apiclient.loginUser(loginData, onSucessLoing,
            onErrorLogin);
    },




        loginUserAndConductor: function (name) {
            var user = {
                "email": $('#correo').val(),
                "password": $('#contrasena').val(),
            };
            user = JSON.stringify(user); //parsea a formato JSON
            if(console.log(document.getElementsByName('Tusuario')[0].checked)){

            }else if(console.log(document.getElementsByName('Tusuario')[1].checked)){

            }
        },

        /*
            FUNCIONES DE REGISTRO
        */
        addUser: function (name) {
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

        registroConductor: function (name) {
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
function tokenSet(){
    return "Bearer " + token; //deja el token con 'bearer' para el back
}

function consultarApi(){
    token = tokenSet();
    console.log(token);
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/cars",
        headers: { "Authorization": token} //Header de autorización
      }).done(function(data){
          console.log(data);
      });
}