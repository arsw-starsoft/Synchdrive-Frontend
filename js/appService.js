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
        constructor(price, duration, distance, customer) {
            this.price = price;
            this.duration = duration;
            this.distance = distance;
            this.customer = customer;
        }

    }
    var stompClient = null;
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
        });
        appMapa.esperandoServicios();
        //appService.sendMensaje();
    };
    var sendMensaje=function(){
        apiclient.consultarUsuario(sessionStorage.getItem('email'), sessionStorage.getItem('token'), publishService);
    }

    //El usuario publica en el topico x
    var publishService = function (customer) {
        console.log("Publishing....");
        var appsActivas=[];
        customer.apps.map(function (f) {
            ch = document.getElementById(f.name);
            console.log(ch)
            if (ch.checked == 1) {
                appsActivas.push(f)
            }
        });
        console.log(customer)
        var customer = new Customer(customer.email,customer.firstName,customer.lastName,customer.userName,customer.cellPhone,customer.password,appsActivas);
        var service = new Service(null,null,null,customer);
        console.log(service);
        console.log(stompClient);
        var listApps = customer.apps;
        console.log(listApps)
        listApps.sort(function (n1,n2) {
            return n1 > n2;
        }); //Ordenar para el back message
        var stringMessage = "";
        listApps.forEach(function (app) {
            stringMessage += "." + app.name.toLowerCase();
        });
        console.log(stringMessage);
        stompClient.send("/app/services" + stringMessage, {}, JSON.stringify(service));
    };

    return {
        connectAndSubscribeUser : connectAndSubscribeUser,
        publishService: publishService,
        sendMensaje:sendMensaje
    }

})();