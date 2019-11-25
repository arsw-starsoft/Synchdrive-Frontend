appService = (function () {
    class Customer {
        constructor(email, firstName, lastName, userName, cellPhone, password, apps) {
            this.email = email;
            this.firstName = firstName;
            this.lastName = lastName;
            this.userName = userName;
            this.cellPhone = cellPhone;
            this.password = password;
            this.apps = apps;
        }
    }
    class Service {
        constructor(price, duration, distance, customer, active, idPeticion, destino) {
            this.price = price;
            this.duration = duration;
            this.distance = distance;
            this.customer = customer;
            this.active = active;
            this.idPeticion = idPeticion;
            this.destino = destino;
        }
    }
    var customerC = null;
    var stompClient = null;
    var webSocketActive = [];
    var servicios = [];
    //Se conecta a el usuario a stomp
    var connectAndSubscribeUser = function () {
        console.log("Connecting to WS...");
        var socket = new SockJS("https://synchdrive.herokuapp.com/stompendpoint");
        stompClient = Stomp.over(socket);

        stompClient.connect({}, function (frame) {
            console.log("Connected: " + frame);
            stompClient.subscribe("/topic/services.users", function (eventBody) {
                var object = JSON.parse(eventBody.body);
                console.log(object);
            });
            stompClient.subscribe("/topic/accepted", function (eventBody) {
                var object = JSON.parse(eventBody.body);
                appService.webSocketActive = [];
                object.forEach(function (obj) {
                    appService.webSocketActive.push(obj);
                })
                //console.log( appService.webSocketActive)
                appEnServicio.ServiciosAceptados();

            });
            appService.sendMensaje();

        });
        appMapa.esperandoServicios();
    };
    var cancelService = function () {
        $('#bucarServicio').prop('disabled', false)
        $('#Destination').prop('disabled', false);
        var list = $("input[type=radio]");
        list.map(function (f) {
            console.log('"#' + list[f].id + '"');
            $('#' + list[f].id).prop('disabled', false);
        });
        list = $("input[type=checkbox]");
        list.map(function (f) {
            console.log('"#' + list[f].id + '"');
            $('#' + list[f].id).prop('disabled', false);
        });
        stompClient = null
    }
    var sendMensaje = function () {
        apiclient.consultarUsuario(sessionStorage.getItem('email'), sessionStorage.getItem('token'), publishService);
        console.log('---------------------------------------')
        $('#bucarServicio').prop('disabled', true)
        $('#Destination').prop('disabled', true);
        console.log($("input[type=radio]"))
        var list = $("input[type=radio]");
        list.map(function (f) {
            console.log('"#' + list[f].id + '"');
            $('#' + list[f].id).prop('disabled', true);
        });
        list = $("input[type=checkbox]");
        list.map(function (f) {
            console.log('"#' + list[f].id + '"');
            $('#' + list[f].id).prop('disabled', true);
        });
    }
    var publishServicefiltros = function (f) {
        list=[];
        list.push(f)
        customer= appService.customerC;
        customer.apps=list;
        console.log(customer)
        var numeroServicios = 0;
            if ($('#OneDriver').is(':checked')) {
                numeroServicios = 1;
            } if ($('#TwoDriver').is(':checked')) {
                numeroServicios = 2;
            } if ($('#ThreeDriver').is(':checked')) {
                numeroServicios = 3;
            }
            for (var i = 1; i <= numeroServicios; i++) {
                console.log($('#Destination').value)
                var service = new Service(null, null, null, customer, true, i, $('#Destination').val());
                console.log(service);
                console.log(stompClient);
                var listApps = customer.apps;
                console.log(listApps)
                console.log(service);
                console.log(stompClient);
                appService.servicios.push(service)
                stompClient.send("/app/services", {}, JSON.stringify(service));
            }
    }

    //El usuario publica en el topico x
    var publishService = function (customer) {
        appService.servicios = [];
        console.log("Publishing....");
        var appsActivas = [];
        customer.apps.map(function (f) {
            ch = document.getElementById(f.name);
            console.log(ch)
            if (ch.checked == 1) {
                appsActivas.push(f)
            }
        });
        console.log("entreeeeeee")
        //console.log(apiclient.consultarAplicacionMasBarata($('#Destination').val(),"uber-didi",sessionStorage.getItem('token'),appService.filtros))
        console.log("entreeeeeee")
        console.log(customer)

        var customer = new Customer(customer.email, customer.firstName, customer.lastName, customer.userName, customer.cellPhone, customer.password, appsActivas);
        appService.customerC = customer;

        if (appsActivas.length > 1 && $('#CheaperService').is(':checked')) {
            aplicacionesEnviar = ""
            destinoT=""
            for (var i = 0; i < appsActivas.length; i++) {
                if (i == appsActivas.length - 1) {
                    aplicacionesEnviar += appsActivas[i].name
                } else {
                    aplicacionesEnviar+=appsActivas[i].name+"-"
                }
            }
            destino=$('#Destination').val().split(" ")
            for (var i = 0; i < destino.length; i++) {
                if (i == destino.length - 1) {
                    destinoT += destino[i]
                } else {
                    destinoT+=destino[i]+"-"
                }
            }
            aplicacionesEnviar=aplicacionesEnviar.toLowerCase()
            console.log(aplicacionesEnviar)
            console.log(destinoT)
            apiclient.consultarAplicacionMasBarata(destinoT, aplicacionesEnviar, sessionStorage.getItem('token'), appService.publishServicefiltros)
        }
        else {
            var numeroServicios = 0;
            if ($('#OneDriver').is(':checked')) {
                numeroServicios = 1;
            } if ($('#TwoDriver').is(':checked')) {
                numeroServicios = 2;
            } if ($('#ThreeDriver').is(':checked')) {
                numeroServicios = 3;
            }
            for (var i = 1; i <= numeroServicios; i++) {
                console.log($('#Destination').value)
                var service = new Service(null, null, null, customer, true, i, $('#Destination').val());
                console.log(service);
                console.log(stompClient);
                var listApps = customer.apps;
                console.log(listApps)
                console.log(service);
                console.log(stompClient);
                appService.servicios.push(service)
                stompClient.send("/app/services", {}, JSON.stringify(service));
            }


        }
    };
    return {
        connectAndSubscribeUser: connectAndSubscribeUser,
        publishService: publishService,
        sendMensaje: sendMensaje,
        cancelService: cancelService,
        webSocketActive: webSocketActive,
        servicios: servicios,
        publishServicefiltros: publishServicefiltros,
        customerC: customerC
    }

})();