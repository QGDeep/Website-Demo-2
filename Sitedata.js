$(document).ready(function(){
    $("#city").change(function(){
        getweatherdata();
    });
});

function getweatherdata(){
    $("#weather").html("");
    
    var scity = $("#city").find(":selected").text();
    var scityID = $("#city").find(":selected").val();
    
    if(scityID != ""){
        
        var Wurl = "http://api.openweathermap.org/data/2.5/weather?id=" + scityID + "&appid=2ad263b9a82888fd39382d86aa2fc030&mode=xml";
        
        $.ajax({
            type: "GET",
            url: Wurl,
            datatype: "xml",
            success: function(xml){
                var output = xmlresponse(xml);
                
                $("#weather").html(output);
            },
            error: function(){
                alert("An error occurred while processing XML file.");
            }
        });
    }
}

function xmlresponse(xml){
    // get city name and country
        var city = $(xml).find("city");
	var cityName = city.attr("name");
        var cord = $(city).find("coord");
        var long = cord.attr("lon");
        var lat = cord.attr("lat");
	var country = $(city).find("country").text();
	// sunrise/set data
	var sun = $(xml).find("sun");
	var sunrise = sun.attr("rise");
	var sunset = sun.attr("set");
	//temprature data		
	var temp = $(xml).find("temperature");
	var tempValue = temp.attr("value");
        var tempMin = temp.attr("min");
        var tempMax = temp.attr("max");
	var tempUnit = temp.attr("unit");
        // humidity data
	var humidity = $(xml).find("humidity");
	var humidityValue = humidity.attr("value");
	var humidityUnit = humidity.attr("unit");
	// pressure data
	var pressure = $(xml).find("pressure");
	var pressureValue = pressure.attr("value");
	var pressureUnit = pressure.attr("unit");
	// wind data
	var wind = $(xml).find("wind");
	
	var speed = $(wind).find("speed"); 
	var windSpeedValue = speed.attr("value");
	var windSpeedName = speed.attr("name");
			
	var gusts = $(wind).find("gusts");
	var gustsValue = gusts.attr("value");
			
	var direction = $(wind).find("direction");
	var directionValue = direction.attr("value");
	var directionName = direction.attr("name");
			
	var clouds = $(xml).find("clouds");
	var cloudsValue = clouds.attr("value");
	var cloudsName = clouds.attr("name");
			
	var visibility = $(xml).find("visibility");
	var visibilityValue = visibility.attr("value");
	
	var precipitation = $(xml).find("precipitation");
	var precipitationMode = precipitation.attr("mode");
	
	var lastupdate = $(xml).find("lastupdate");
	var lateupdateValue = lastupdate.attr("value");
        // weather icon
	var weather = $(xml).find("weather");
	var weatherIcon = weather.attr("icon");
	var weatherImageUrl = "http://openweathermap.org/img/w/" + weatherIcon + ".png";
	
	var weatherString = "<b>Weather for " + cityName + " " + country + "</b> <img src=" + weatherImageUrl + " \/><br/>";
		weatherString += "<b>Longitude: </b>" + long + "<b>, Latitude: </b>"+ lat +"<br/>";
		weatherString += "<ul>";
		weatherString += "<li><b>Sunrise:</b> " + sunrise + "</li>";
		weatherString += "<li><b>Sunset:</b> " + sunset + "</li>";
		weatherString += "<li><b>Temperature:</b> " + tempValue + " " + tempUnit + "</li>";
		weatherString += "<li><b>Temperature Min:</b> " + tempMin + " " + tempUnit + "</li>";
		weatherString += "<li><b>Temperature Max:</b> " + tempMax + " " + tempUnit + "</li>";
		weatherString += "<li><b>Humidity:</b> " + humidityValue + " " + humidityUnit + "</li>";
		weatherString += "<li><b>Pressure:</b> " + pressureValue + " " + pressureUnit  + "</li>";
		weatherString += "<li><b>Wind Speed:</b> " + windSpeedValue + " " + windSpeedName + "</li>";
		weatherString += "<li><b>Wind Gusts:</b> " + gustsValue + "</li>";
		weatherString += "<li><b>Wind Direction:</b> " +  directionValue + " " + directionName + "</li>";
		weatherString += "<li><b>Clouds:</b> " + cloudsValue + " " + cloudsName + "</li>";
		weatherString += "<li><b>Visibility:</b> " + visibilityValue + "</li>";
		weatherString += "<li><b>Prescipitation:</b> " + precipitationMode + "</li>";
		weatherString += "<li><b>Last Updated:</b> " + lateupdateValue + "</li>";
		weatherString += "</ul>";
	return weatherString;
}


