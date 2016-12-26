$("document").ready(function() {
	
	var key = "cac609078f73424e22b0d8c9bf67a1b2";
	var img_src = "http://openweathermap.org/img/w/";
	var uri = "http://api.openweathermap.org/data/2.5/weather?";
	var celsius;
	var fahrenheit;
		
	//Get geolocation of user
	if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var temp_url = uri + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID="  + key;
            $.ajax({
				url: temp_url,
				success: function(result,status,obj) {
					console.log("ajax");
					console.log(status);
					console.log(result);
					var temp_text;
					temp_text = result.name + ", " + result.sys.country;
					$("#location-p").html(temp_text);
					celsius = Math.floor(result.main.temp - 273.15);
					fahrenheit = Math.floor(result.main.temp*9/5 - 459.67);
					$("#temperature-p").html(celsius + " &deg;C");
					temp_text = result.weather[0].description;
					$("#description-p").html(temp_text);
					temp_text = "<img src='" + img_src + result.weather[0].icon + ".png'></img>";
					$("#icon-p").html(temp_text);
					
					//Change styles accordingly
					var temp_id = result.weather[0].id;
					switch (true) {
						case (temp_id > 199 && temp_id < 300): //Thunderstorm
							$("body").css("background-image","url('http://farmersalmanac.com/wp-content/uploads/2015/06/Thunderstorm-5best.jpg')");
							break;
						case (temp_id > 299 && temp_id < 400): //Drizzle
							$("body").css("background-image","url('https://adnanfakir.files.wordpress.com/2011/10/04.jpg')");
							break;
						case (temp_id > 499 && temp_id < 600): //Rain
							$("body").css("background-image","url('http://weknowyourdreams.com/images/rain/rain-04.jpg')");
							break;
						case (temp_id > 599 && temp_id < 700): //Snow
							$("body").css("background-image","url('https://a2ua.com/snowing/snowing-002.jpg')");
							$("p").css("color","black");
							$("h1").css("color","black");
							break;
						case (temp_id == 800): //Clear Sky
							$("body").css("background-image","url('https://static.squarespace.com/static/53bd3460e4b07d8e4ad42994/t/53d05575e4b0b1c1fde219b1/1406162293119/wallpapers-sky-clear-grasslands-hd-1280x800.jpg')");
							break;
						case (temp_id > 800 && temp_id < 900): //Clouds
							$("body").css("background-image","url('http://cdn.wallpapersafari.com/59/56/OIKtYn.jpg')");
							break;
						default:
							break;
					}
				}
			});
         });
	}
	
	
	
	$("#temperature-btn").click(function() {
		if(document.getElementById('temperature-btn').innerHTML == "Fahrenheit") {
			$("#temperature-p").html(fahrenheit + " &deg;F");
			$("#temperature-btn").html("Celsius");
		} else {
			$("#temperature-p").html(celsius + " &deg;C");
			$("#temperature-btn").html("Fahrenheit");
		}
	});
	
});




