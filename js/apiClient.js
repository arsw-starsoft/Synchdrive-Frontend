apiclient=(function(){
	return {
		/*
			FUNCIONES DE REGISTRO
		*/
		registroUser:function(datos, succ, err){
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://synchdrive.herokuapp.com/users",
				data: datos,
				success: succ,
				error: err
			});
		},

		registroConductor:function(datos, succ, err){
			$.ajax({
				method: "POST",
				contentType: "application/json",
				url: "https://synchdrive.herokuapp.com/drivers",
				data: datos,
				success: succ,
				error: err
			});
		}
	}
})();