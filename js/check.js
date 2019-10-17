
function selectAnos(){
    var from = new Date(1990,1,1);
    var to = new Date();
    for (var day = from; day <= to; day.setFullYear(day.getFullYear() + 1)) {
        $("#year").append("<option value='" + day.getFullYear() + "'>" + day.getFullYear() + "</option>");
    }

}
    

