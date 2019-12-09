appEnServicio = (function () {
    var numeroServicios = 0;
    var generarInformacion=function(fun){
        $("#informacion").html("")
        console.log(fun)
        service=null
        idmasGrande=0;
        fun.map(function(f){
            if(f.idService>idmasGrande){
                idmasGrande=f.idService;
            }
        })
        fun.map(function(f){
            if(f.idService==idmasGrande){
                service=f;
            }
        })
        console.log(service)
        var elemento='<label for="Name" style="color: aliceblue; top:20%; left: 43%;position: absolute; font-weight: bold">'+
        "Driver Name: "+service.driver.userName+ '<br></br>'+
        "Destination: "+service.destino+'<br></br>'+
        "Price: "+service.price+'</label>'
        $("#informacion").html(elemento)
    }
    var cargarInformacion=function(){
        apiclient.consultarHistorial(sessionStorage.getItem('email'), sessionStorage.getItem('token'),appEnServicio.generarInformacion)
    }
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
                    //console.log(list[0].idService)
                    //sessionStorage.setItem("IdService",list[0].idService);
                }
            })
            if (services.length == 0) {
                location.href = "EnServicio.html"
            }
        }

    }
    return {
        ServiciosAceptados: ServiciosAceptados,
        numeroServicios: numeroServicios,
        generarInformacion:generarInformacion,
        cargarInformacion:cargarInformacion
    }

})();