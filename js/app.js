

app = (function () {
    // PROMESAS DEL REGISTRO
    var email;
    var check_session = function () {

        var user = readCookie("nickname");
        if (user == null) {
            alert("Permiso denegado, debe logearse primero.")
            location.href = "/index.html"
        }
    };

    var onSucessRegistro = function (data) {
        alert("Ha sido registrado exitosamente");
        location.href = "loginUser.html";
    }
    var onErrorRegistro = function (data) {
        alert("No se pudo realizar el registro correctamente");
        location.href = "";
    }
    var onErrorUpdate = function (data) {
        alert("No se pudo realizar la actualizacion  correctamente");
        location.href = "perfilUser.html";
    }
    var onSucessUpdate = function (data) {
        alert("Ha sido actualizado exitosamente");
        location.href = "perfilUser.html";
    }
    var onSucessLoing = function (data) {
        sessionStorage.setItem('token', "Bearer " + data["token"])
        sessionStorage.setItem('email', email)
        console.log(sessionStorage.getItem('token'))
        alert("Ha sido Login exitosamente");
        location.href = "perfilUser.html";

    }
    var LogOut = function (data) {
        sessionStorage.clear('token');
        sessionStorage.clear('email');
        location.href = "loginUser.html";
    }
    var cargarDatos = function (data) {
        /*console.log(console.log(sessionStorage.getItem('email')))
        if (sessionStorage.getItem('email') == null ){
            alert("Permiso denegado, debe logearse primero.")
            location.href = "/loginUser.html"
        }else{
            apiclient.consultarUsuario(sessionStorage.getItem('email'), sessionStorage.getItem('token'), actualizarPerfil)
        }*/
        apiclient.consultarUsuario(sessionStorage.getItem('email'), sessionStorage.getItem('token'), actualizarPerfil)

    }
    var actualizarPerfil = function (funcion) {
        chk=funcion["apps"]
        for(i=0;i<chk.length;i++){
            ch=document.getElementById(chk[i]["name"]);
            ch.checked=1
        }
        console.log(funcion)
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

    
    var updateDatos = function (data) {
        list= []
        chk=document.getElementsByName('Tcuenta');
        for(i=0;i<chk.length;i++){
            if(chk[i].checked){
                elemento={"name":chk[i].id}
                list.push(elemento)
            }
               
        }
        
        var json = {
            "email": $("#Email").val(),
            "firstName": $("#FirstName").val(),
            "lastName": $("#LastName").val() , 
            "userName":  $("#UserName").val(), 
            "cellPhone": $("#CellPhone").val(),
            "apps":list
        }
        updateData=JSON.stringify(json);
        return apiclient.updateUser(updateData, onSucessUpdate,
            onErrorUpdate);
    }
    return {
        /*
            FUNCIONES DE LOGIN
        */
        login: function (name) {
            var loginData = {
                "username": $('#correo').val(),
                "password": $('#contrasena').val(),
            };
            loginData = JSON.stringify(loginData);
            email = $('#correo').val();
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
        cargarDatos: cargarDatos,
        LogOut: LogOut,
        check_session: check_session,
        updateDatos: updateDatos
    }
})();
