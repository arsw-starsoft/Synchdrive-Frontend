apiclient=(function(){
	return {
		loginUser:function(datos, succ, err){
			$.ajax({
				type: "POST",
				url: "https://synchdrive.herokuapp.com/authenticate",
				contentType:"application/json; charset=utf-8", //importante para el back
				dataType: 'json',
				data : datos,
				success:succ,
				error:err
			});
		},
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