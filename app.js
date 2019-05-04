window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let degreeSection = document.querySelector('.degree-section');
    const temperatureSpan = document.querySelector('.degree-section span');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition
        (position => {
            console.log(position);
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/bdc956c0b027786f29bf24a6b8785623/${lat},${long}`;
            fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                const { temperature, summary, icon } = data.currently;
                // Set DOM elements from the API
                temperatureDegree.textContent = Math.floor(temperature);
                temperatureDescription.textContent = summary;
                locationTimezone.textContent = data.timezone.replace(/_/g, " ");

                // Formula for celsius 
                let celsius = (temperature - 32) * (5/9);

                // Set Icon
                setIcons(icon, document.querySelector('.icon'));

                // Change temperature to celsius
                degreeSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === "F") {
                        temperatureSpan.textContent = "C";
                        temperatureDegree.textContent = Math.floor(celsius);
                    }
                    else{
                        temperatureSpan.textContent = "F";
                        temperatureDegree.textContent = Math.floor(temperature);
                    }
                })
            });
        });

        
    }
    else{
        h1.textContent = "This is not working due to no location detected.";
    }

    function setIcons(icon, iconId){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconId, Skycons[currentIcon]);
    }
});