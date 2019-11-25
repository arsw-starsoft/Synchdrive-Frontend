appMapa = (function () {
    var apps;
    var cordenadaSuccess = function (position) {
        var coordenadas = position.coords;
        console.log('Tu posición actual es:');
        console.log('Latitud : ' + coordenadas.latitude);
        console.log('Longitud: ' + coordenadas.longitude);
        console.log('Más o menos ' + coordenadas.accuracy + ' metros.');
        L.marker([coordenadas.latitude, coordenadas.longitude]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

    };

    var cordenadasError = function (error) {
        console.warn('ERROR(' + error.code + '): ' + error.message);
    };
    var menu = function (funcion) {
        console.log("funcional");
        var cont = 1;
        var elementos = "";
        apps = funcion.apps;
        funcion.apps.map(function (f) {
            console.log(f)
            elementos += '<input type="checkbox" name="checkbox' + cont + '"id="' + f.name + '"onclick="appMapa.comprobarServicios()">' +
                '<label for="' + f.name + '">' + f.name + '</label>';
            cont += 1;

        });
        $("#aplicaciones").html(elementos)
        menuNservices()
    };
    var comprobarServicios = function () {
        var num = 0;
        var elementos = "";
        apps.map(function (f) {
            ch = document.getElementById(f.name);
            console.log(ch)
            if (ch.checked == 1) {
                num += 1;
                console.log(num)
            }
        });
        if (num <= 1) {
            $("#typeservices").html(elementos)
        } else {
            elementos = '<input type="radio" name="servicios" id="CheaperService">' +
                '<label for="CheaperService">Cheaper Service</label>' +
                '<input type="radio" name="servicios" id="NearestDriver">' +
                '<label for="NearestDriver">Nearest Driver</label>';
            $("#typeservices").html(elementos)

        }
    };
    var menuNservices = function () {
        var elementos = "";

        elementos = ' <input type="radio" name="NServices" id="OneDriver">' +
            '<label for="OneDriver">One Driver</label>' +
            '<input type="radio" name="NServices" id="TwoDriver">' +
            '<label for="TwoDriver">Two Driver</label>' +
            ' <input type="radio" name="NServices" id="ThreeDriver">' +
            ' <label for="ThreeDriver">Three Driver</label>';
        $("#nservices").html(elementos)
    }
    var esperandoServicios = function () {
        elementos = '<div class="loading first">' +
            '<div class="loading second">' +
            '<div class="loading third"></div>' +
            '</div>' +
            '</div>';
        $("#estadoService").html(elementos)
        elementos = '<input type="button" id="cancelService" value="Cancel Search" class="btn float-none login_btn"onclick="appMapa.cancelarBusqueda()">'
        
        $("#cancelarservice").html(elementos)
    }
    var cancelarBusqueda=function(){
        elementos='';
        appService.cancelService();
        $("#estadoService").html(elementos)
        $("#cancelarservice").html(elementos)
    }
    return {
        getCordenadas: function (name) {
            if (sessionStorage.getItem('email') == null) {
                alert("Permiso denegado, debe logearse primero.")
                location.href = "/loginUser.html"
            } else {
                var options = {
                    enableHighAccuracy: true,
                    timeout: 6000,
                    maximumAge: 0
                };
                apiclient.consultarUsuario(sessionStorage.getItem('email'), sessionStorage.getItem('token'), menu)
                //appService.connectAndSubscribeUser();
                return navigator.geolocation.getCurrentPosition(cordenadaSuccess, cordenadasError, options);
            }

        },
        menu: menu,
        comprobarServicios: comprobarServicios,
        esperandoServicios: esperandoServicios,
        cancelarBusqueda:cancelarBusqueda
    }

})();



