appEnServicio = (function () {
    var numeroServicios = 0;
    var ServiciosAceptados = function () {
        if (appService.enServicio) {
            console.log(appService.webSocketActive)
            console.log(appService.servicios)
            var services = []
            appService.servicios.map(function (f) {
                console.log(f.customer.email);
                console.log(f.idPeticion)

                var list = appService.webSocketActive.filter(function (serv) {
                    return serv.idPeticion == f.idPeticion && f.customer.email == serv.customer.email;
                });
                console.log("---------------sisa----------")
                if (list.length != 0) {
                    services.push(list)
                }
            })
            if (services.length == 0) {
                location.href = "EnServicio.html"
            }
        }

    }
    return {
        ServiciosAceptados: ServiciosAceptados,
        numeroServicios: numeroServicios
    }

})();