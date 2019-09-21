function check(value){
    document.getElementsByName('Tusuario')[value-1].checked=true
    if(value==1){

        if(document.getElementById('usuario_normal').className!='img-circle-on'){
           
            document.getElementById('usuario_normal').className='img-circle-on'
            document.getElementById('usuario_conductor').className='img-circle-off'
        }else{
            document.getElementById('usuario_normal').className='img-circle-off'
        }
        
    }else{
        if(document.getElementById('usuario_conductor').className!='img-circle-on'){
            document.getElementById('usuario_normal').className='img-circle-off'
            document.getElementById('usuario_conductor').className='img-circle-on'
        }else{
            document.getElementById('usuario_conductor').className='img-circle-off'
        }
       
    }
}
function checkCuentas(value){
    

    console.log(document.getElementsByName("Tcuenta")[value-1].check)
    if(document.getElementsByName("Tcuenta")[value-1].check!=true){
       
        document.getElementsByName("Tcuenta")[value-1].check=true 
        document.getElementById(document.getElementsByName("Tcuenta")[value-1].id+"-imagen").className="imgRedonda-on"
    }else{
        document.getElementsByName("Tcuenta")[value-1].check=false
        document.getElementById(document.getElementsByName("Tcuenta")[value-1].id+"-imagen").className="imgRedonda-off"
    }
    
    
}
function probar (){
    var checkboxes = document.getElementById("form1").check;
    console.log(document.getElementById("form1").checkbox)
    cont = 0; 
    for (var x=0; x < checkboxes.length; x++) {
     if (checkboxes[x].checked) {
      cont = cont + 1;
     }
    }
    

}