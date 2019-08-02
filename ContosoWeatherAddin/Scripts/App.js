$(document).ready(function () {
    // Get the user's position
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude;
            var long = position.coords.longitude;

            var apiKey = "151e33a27450ae43f0e65a3e302f63a6";

            //Dark Sky URL
            var weatherURL = "https://api.darksky.net/forecast/";

            //Cross-Origin URL to allow use on Chrome
            var corsURL = "https://cors-anywhere.herokuapp.com/";

            //Full Weather Forecast URL
            var fullURL = corsURL + weatherURL + apiKey + "/" + lat + "," + long + "?exclude=minutely&extend=hourly,daily&units=si";

            // Shows fahrenheit by default
            // ...Change temp to Celcius
            var usingFahrenheit = false;

            // Create an array to calculate between scales once and flip as a user wants
            var temperatures = {
                fahrenheit: [],
                celsius: []
            };

            function insertData(temperatures) {
                // Use operator here to assign F or C symbol to tempSymbol during toggle
                var tempSymbol = usingFahrenheit ? "&deg;F" : "&deg;C";
                return $(temperatures).each(function (index, value) {
                    
                    $('.tempCurr').html('<i class="wi wi-thermometer"></i> ' + value + tempSymbol);
                    $('.temp' + index).html('<i class="wi wi-thermometer"></i> ' + value + tempSymbol);
                   // $('.tempMax' + index).html('Highs of: ' + value + tempSymbol);
                   // $('.tempMin').html('Lows of: ' + value + tempSymbol);

                });
            }

            $('#convertTemp').click(function () {
                // invert our usingFahrenheit flag
                usingFahrenheit = !usingFahrenheit;

                if (usingFahrenheit) {
                    insertData(temperatures.fahrenheit);
                } else {
                    insertData(temperatures.celsius);
                }
            });

            // jQuery JSON call to pull in temperature and icon information
            $.getJSON(fullURL, function (json) {
                // Display weather information
                var fahrenheitTemp;
                var celsiusTemp;
                var currentTemp;
                var currentFahrenheitTemp;
                var tempMaxC;
                var tempMaxC;
                var tempMaxFahrenheit;
                var tempMinFahrenheit;
                var icon;
                var desc;
                var humidity;
                var pressure;
                var wind;
                var dayName;
                var dayNum;

                

                // Set up the loop to go through the daily array
                for (i = 0; i < json.daily.data.length; i++) {

                    // Daily forecast report for each day of the week
                    // Format temp data
                    celsiusTemp = Math.round(json.daily.data[i].apparentTemperatureMax);
                    console.log('HEY c*** ' + celsiusTemp);
                    $('.temp' + i).html('<i class="wi wi-thermometer"></i> ' + celsiusTemp);


                    fahrenheitTemp = Math.round((celsiusTemp * 9/5) + 32);
                    console.log('HELLO F*** ' + fahrenheitTemp);


                    //Current Temp- big display
                    currentTemp = Math.round(json.currently.temperature);
                    $('.tempCurr').html('<i class="wi wi-thermometer"></i> ' + currentTemp);
                    currentFahrenheitTemp = Math.round((currentTemp * 9/5) + 32);

                    //Get daily Max and Min Temp and convrt C to F
                    tempMaxC = Math.round(json.daily.data[i].temperatureMax);
                    //tempMaxFahrenheit = Math.round((tempMaxC * 9 / 5) + 32);

                    tempMinC = Math.round(json.daily.data[i].temperatureMin);
                    tempMinFahrenheit = Math.round((tempMinC * 9/5) + 32);

                    $('.tempMax' + i).html('Highs of: ' + tempMaxC + '&degC');
                    $('.tempMin' + i).html('Lows of: ' + tempMinC + '&degC');

                    // Store data in temperatures object
                    temperatures.fahrenheit.push(fahrenheitTemp);
                    temperatures.celsius.push(celsiusTemp);

                    temperatures.fahrenheit.push(currentFahrenheitTemp);
                    temperatures.celsius.push(currentTemp);

                    icon = json.currently.icon;
                    $('.iconCurr').html("<i class='wi wi-forecast-io-" + icon + "'></i>");

                    //Retrieve summary current data 
                    desc = json.currently.summary;
                    console.log('SUMMARY' + desc)
                    $('.descCurr').html('Currently... ' + '<br>' +'<br>' + desc);


                    //Retrieve icon data and display on page
                    icon = json.daily.data[i].icon;
                    $('.icon' + i).html("<i class='wi wi-forecast-io-" + icon + "'></i>");

                    //Retrieve summary data and display on page
                    desc = json.daily.data[i].summary;
                    console.log('SUMMARY' + desc)
                    $('.desc' + i).html(desc);


                    //Retrieve humidity data and display on page
                    humidity = (json.daily.data[i].humidity.toString().substr(2));
                    console.log('HUMID' + humidity)

                    $('.humidity' + i).html('<i class="wi wi-humidity"></i> ' + 'Humidity: ' + humidity + '%');

                    //Retrieve wind data and display on page
                    wind = (json.daily.data[i].windSpeed.toFixed(0));
                    console.log('Wind Speed: ' + wind)

                    $('.wind' + i).html('<i class="wi wi-strong-wind"></i> ' + 'Wind Speed: ' + wind + 'm/s');


                    //Retrieve pressure data and display on page
                    pressure = (json.daily.data[i].pressure.toString().substr(2));
                    console.log('Pressure: ' + pressure)

                    $('.pressure' + i).html('<i class="wi wi-barometer"></i> ' + 'Pressure: ' + pressure);

                    //Retrieve UV index data and display on page
                    var uvIndex = (json.daily.data[i].uvIndex);
                    console.log('Index ' + uvIndex)

                    // $('.uvindex' + i).html('UV Index ' + uvIndex);

                    if (uvIndex <= 2) {
                        $('.uvindex' + i).html('UV Index: ' + 'Low');
                    }
                    else if (uvIndex >= 3) {
                        $('.uvindex' + i).html('UV Index: ' + 'High');

                    }


                    //Retrieve wind direction data in degrees, convert it to compass direction and display on page
                    var windDir = (json.daily.data[i].windBearing);
                    console.log('WiBearing,,,,,, ' + windDir)
                    
                        if (windDir > 11.25 && windDir <= 33.75) {
                          
                            $('.windDir' + i).html('NNE');
                        } else if (windDir > 33.75 && windDir <= 56.25) {
                           
                            $('.windDir' + i).html('ENE');
                        } else if (windDir > 56.25 && windDir <= 78.75) {
                         
                            $('.windDir' + i).html('E');
                        } else if (windDir > 78.75 && windDir <= 101.25) {
                        
                            $('.windDir' + i).html('ESE');
                        } else if (windDir > 101.25 && windDir <= 123.75) {
                        
                            $('.windDir' + i).html('ESE');
                        } else if (windDir > 123.75 && windDir <= 146.25) {
                        
                            $('.windDir' + i).html('SE');
                        } else if (windDir > 146.25 && windDir <= 168.75) {
                           
                            $('.windDir' + i).html('SSE');
                        } else if (windDir > 168.75 && windDir <= 191.25) {
                           
                            $('.windDir' + i).html('S');
                        } else if (windDir > 191.25 && windDir <= 213.75) {
                          
                            $('.windDir' + i).html('SSW');
                        } else if (windDir > 213.75 && windDir <= 236.25) {
                         
                            $('.windDir' + i).html('SW');
                        } else if (windDir > 236.25 && windDir <= 258.75) {
                        
                            $('.windDir' + i).html('WSW');
                        } else if (windDir > 258.75 && windDir <= 281.25) {
                          
                            $('.windDir' + i).html('W');
                        } else if (windDir > 281.25 && windDir <= 303.75) {
                         
                            $('.windDir' + i).html('WNW');
                        } else if (windDir > 303.75 && windDir <= 326.25) {
                          
                            $('.windDir' + i).html('NW');
                        } else if (windDir > 326.25 && windDir <= 348.75) {
                        
                            $('.windDir' + i).html('NNW');
                        } else {
                         
                            $('.windDir' + i).html('N');
                        }
                    //end wind dir

                    //Set up day name and display on page
                    dayName = moment().add(i, "day").format("ddd");
                    $('.day' + i).html(dayName);

                    //Set up day date and display on page
                    dayNum = moment().add(i, "day").format("DD");
                    $('.date' + i).html(dayNum);

                    //YEAR AND MONTH
                    //Display the current month + year using Moment.js

                    var month = moment().format('ddd, MMMM, YYYY');
                    $('#month').html(month);

                    
                    //Display current time using Moment.js
                    var dateTimeString = moment().format("LT");
                    $(".time").html(dateTimeString);


                    //START DAILY CHART
                    var forecastData = {
                        highTemp: [],
                        lowTemp: []
                    }

                    $.getJSON(fullURL, function (json) {
                        for (i = 0; i < json.daily.data.length; i++) {
                            forecastData.highTemp[i] = Math.round(json.daily.data[i].apparentTemperatureMax);
                            forecastData.lowTemp[i] = Math.round(json.daily.data[i].apparentTemperatureMin);
                        }

                        var ctx = document.getElementById("myChart");
                        var chart = new Chart(ctx, {
                            type: "bar",
                            data: {
                                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                                datasets: [
                                    {
                                        label: "Low Temp",
                                        data: forecastData.lowTemp,
                                        // fill: false,
                                        backgroundColor: "rgba(79,117,180,0.95)",
                                        borderColor: "rgba(49,85,144,1)",
                                        borderWidth: 1,
                                        lineTension: 0,
                                    },
                                    {
                                        label: "High Temp",
                                        data: forecastData.highTemp,
                                        // fill: false,
                                        backgroundColor: "rgba(211,96,96,0.95)",
                                        borderColor: "rgba(223,53,53,1)",
                                        borderWidth: 1,
                                        lineTension: 0,
                                    }
                                ]
                            },
                            options: {
                                title: {
                                    display: true,
                                    text: "7-Day Forecast"
                                },
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero: true
                                        }
                                    }]

                                }
                            },
                        })

                    })

                    //END DAILY CHART
                }

                // display temp data on page
                insertData(temperatures.celsius);

            });

            //Variables to get user's location using Google Maps API
            var googleAPIKey = "AIzaSyBHqPpUrThJKp1KZM5wxGvPiy58AwMdvCc";
            //console.log(otherAPIKey);

            //Google Maps URL
            var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
            //console.log(googleURL);

            //Full URL to query address using coordinates
            var addressURL = googleURL + lat + "," + long + "&key=" + googleAPIKey;
            //console.log(addressURL);

            //Holds location of user
            let storableLocation = {};

            //jQuery JSON call to pull in address information
            //Using "for" loop to go through object array
            $.getJSON(addressURL, function (json) {


                //start loop
                for (i = 0; i < json.results[0].address_components.length; i++) {

                    var component = json.results[0].address_components[i];

                    if (component.types.includes('sublocality') || component.types.includes('locality')) {
                        storableLocation.city = component.long_name;
                        console.log('HEY ' + storableLocation.city);
                    }
                    else if (component.types.includes('administrative_area_level_1')) {
                        storableLocation.state = component.short_name;
                        console.log('HEY ' + storableLocation.state);
                    }
                    else if (component.types.includes('country')) {
                        storableLocation.country = component.long_name;
                        console.log('HEY ' + storableLocation.country);

                        storableLocation.registered_country_iso_code = component.short_name;
                        console.log('HEY ' + storableLocation.registered_country_iso_code);
                    }

                    //Display User's location
                    $('.location').html(storableLocation.city + ', ' + storableLocation.country);
                }

            });

        });
         
    }

    else {
        console.log('geolocation does not exist.');
    }
 })
