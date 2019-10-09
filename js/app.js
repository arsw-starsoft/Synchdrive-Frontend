  

app = (function () {
    // PROMESAS DEL REGISTRO
    var email; 
    var onSucessRegistro = function (data) {
        alert("Ha sido registrado exitosamente");
        location.href = "loginUser.html";
    }
    var onSucessLoing = function (data) {
        sessionStorage.setItem('token',"Bearer "+data["token"])
        sessionStorage.setItem('email',email)
        console.log(sessionStorage.getItem('token'))
        alert("Ha sido Login exitosamente");
        location.href = "perfilUser.html";
        
    }
    var cargarDatos= function (data) {
        apiclient.consultarUsuario(sessionStorage.getItem('email'),sessionStorage.getItem('token'),actualizarPerfil)
    }
    var actualizarPerfil=function(funcion){
        $("#UserName").val(funcion["userName"]);
        $("#Email").val(funcion["email"]);
        $("#FirstName").val(funcion["firstName"]);
        $("#LastName").val(funcion["lastName"]);
        $("#CellPhone").val(funcion["cellPhone"]);
        $("#telefono").text(funcion["cellPhone"]);
        $("#nombre").text(funcion["userName"]);
        $("#correo").text(funcion["email"]);
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
        email=$('#correo').val();
        return apiclient.loginUser(loginData, onSucessLoing,
            onErrorLogin);
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
        },
        cargarDatos:cargarDatos
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