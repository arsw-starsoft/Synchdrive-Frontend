function iniciarMap(){
    var coord = {lat:-34.5956145 ,lng: -58.4431949};
    console.log("entrooo")
    
    var map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    console.log(map)
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });
    
}