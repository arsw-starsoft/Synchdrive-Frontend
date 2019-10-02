var addUser = function () {
    var nombreI = document.getElementById("nombre").value;
    var correoI = document.getElementById("correo").value;
    var contrasenaI = document.getElementById("contrasena").value;
    console.log(nombreI);
    console.log(correoI);
    console.log(contrasenaI);
    if (nombreI == "" || correoI == "" || contrasenaI == "") {
        alert("Diligencie Completamente Los Datos");
    } else {
        //axios.post('http://localhost:8086/cats/usuario', {
        axios.post('https://synchdrive.herokuapp.com/users', {
            email: correoI,
            userName: nombreI,
            password: contrasenaI,
        })
            .then(function (response) {
                window.location.assign('login.html')

            })
            .catch(function (error) {
                swal({ title: '¡Error en el registro!', icon: 'error', text: 'Revisalo Porfa', type: 'success' }).then(function () {
                    console.log("funciono inexistente")
                })
                console.log(error + ' No se logro hacer post')
            })
    }
}
var addDriver = function () {
    var nombreI = document.getElementById("nombre").value;
    var celularI = document.getElementById("cell").value;
    var correoI = document.getElementById("correo").value;
    var contrasenaI = document.getElementById("contrasena").value;
    console.log(nombreI);
    console.log(correoI);
    console.log(contrasenaI);
    console.log(celularI);
    if (nombreI == "" || correoI == "" || contrasenaI == ""|| celularI == "") {
        alert("Diligencie Completamente Los Datos");
    } else {
        //axios.post('http://localhost:8086/cats/usuario', {
        axios.post('https://synchdrive.herokuapp.com/drivers', {
            email: correoI,
            userName: nombreI,
            password: contrasenaI,
            cellPhone: celularI,
        })
            .then(function (response) {
                window.location.assign('login.html')

            })
            .catch(function (error) {
                swal({ title: '¡Error en el registro!', icon: 'error', text: 'Revisalo Porfa', type: 'success' }).then(function () {
                    console.log("funciono inexistente")
                })
                console.log(error + ' No se logro hacer post')
            })
    }
}
var getUserData = function() {
    console.log("ALL COOKIES: " + window.Cookies);
}