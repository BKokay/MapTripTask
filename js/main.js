let button;
let input;
let token;   

function geocode(address) {
    const url =
      "https://api.maptrip.de/v1/geocoder/?provider=TomTom&" +
      "address=" +
      encodeURIComponent(address);
  
    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Could not geocode address!");
          return Promise.reject(new Error("Could not geocode address!"));
        }
      })
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((error) => {
        console.log(error);
        return "";
      });
}

document.addEventListener("DOMContentLoaded", function() {
    button = document.getElementById("submit-button");
    input = document.getElementById("address-input");

    button.addEventListener("click", function() {
        const address = input.value; 

        geocode(address)
        .then((result) => {
            console.log(result);
            console.log(result[0].address.coordinate.lat +
                " / " +
                result[0].address.coordinate.lon)    
        })
        .catch((error) => {
            console.log(error);
        })
    })
    
    // Create the map object
    var map = new IWMap(document.getElementById('map'));
    var options = map.getOptions();
    options.setSize(new IWSize(1000, 600));

    // Define a new coordinate object and set it as center
    // ---- This needs to be updated to the coordinates from to event in line 43 ----
    var coordinate = new IWCoordinate(7.1408879, 50.70150837, IWCoordinate.WGS84);

    map.setCenter(coordinate);


    //Set authorization token 
    fetch('https://api.maptrip.de/v1/authenticate/apikey', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          apikey: '451f0664-2c88-4177-afcd-330ede4d170d',
          duration: 2592000
        })
      })
        .then(response => response.json())
        .then(data => {
            token = data.authorization
        })
        .catch(error => console.error(error));
});



