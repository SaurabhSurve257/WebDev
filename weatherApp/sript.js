// //https://github.com/omkar2711/b4_weatherApp/blob/main/script.js
// const API_KEY=`3fe7fb1ade69f0ac8477eaaf10d`;
// const url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

// const url = 'https://jsearch.p.rapidapi.com/search?query=developer%20jobs%20in%20Pune&page=1&num_pages=1&country=IN&date_posted=all'; const options = { method: 'GET', headers: { 'x-rapidapi-key':



const API_KEY = '331ca92302e15a439c9d10c2f72bc394';

// Function to get weather emoji/icon based on weather condition
function getWeatherIcon(weatherDescription, weatherCode) {
    const iconMap = {
        'clear': '☀️',
        'sunny': '☀️',
        'clouds': '☁️',
        'cloudy': '☁️',
        'rain': '🌧️',
        'rainy': '🌧️',
        'drizzle': '🌦️',
        'thunderstorm': '⛈️',
        'snow': '❄️',
        'mist': '🌫️',
        'smoke': '💨',
        'haze': '🌫️',
        'dust': '💨',
        'fog': '🌫️',
        'sand': '🌪️',
        'ash': '💨',
        'squall': '🌪️',
        'tornado': '🌪️'
    };

    // Find matching icon for weather condition
    const description = weatherDescription.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
        if (description.includes(key)) {
            return icon;
        }
    }

    return '🌍'; // Default icon
}

// Function to get background style based on weather
function getWeatherBackground(weatherDescription) {
    const description = weatherDescription.toLowerCase();
    
    if (description.includes('clear') || description.includes('sunny')) {
        // Clear Sky - bright blue
        return 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFE4B5 100%)';
    } else if (description.includes('cloud')) {
        // Cloudy - gray clouds
        return 'linear-gradient(180deg, #A9A9A9 0%, #D3D3D3 50%, #C0C0C0 100%)';
    } else if (description.includes('rain') || description.includes('drizzle')) {
        // Rainy - dark gray and blue
        return 'linear-gradient(180deg, #2F4F4F 0%, #4A5568 50%, #36454F 100%)';
    } else if (description.includes('thunderstorm')) {
        // Thunderstorm - very dark purple and black
        return 'linear-gradient(180deg, #1A1A2E 0%, #16213E 50%, #0F3460 100%)';
    } else if (description.includes('snow')) {
        // Snow - light white and pale blue
        return 'linear-gradient(180deg, #F0F8FF 0%, #E6F2FF 50%, #D0E8F2 100%)';
    } else if (description.includes('mist') || description.includes('fog')) {
        // Fog - misty pale colors
        return 'linear-gradient(180deg, #B8B8B8 0%, #D9D9D9 50%, #A9A9A9 100%)';
    }
    
    // Default - clear sky
    return 'linear-gradient(180deg, #87CEEB 0%, #E0F6FF 50%, #FFE4B5 100%)';
}

function getWeather() {
    const city = document.getElementById('city').value;
    const country = document.getElementById('country').value;

    if (!city || !country) {
        alert('Please enter both city and country');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherContainer = document.getElementById('weatherResult');
            const weatherIcon = getWeatherIcon(data.weather[0].description);
            const weatherDesc = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
            
            // Change background based on weather
            const newBackground = getWeatherBackground(data.weather[0].description);
            document.body.style.background = newBackground;
            
            weatherContainer.innerHTML = `
                <div style="font-size: 4rem; text-align: center; margin: 10px 0;">${weatherIcon}</div>
                <h2>Weather in ${data.name}, ${data.sys.country}</h2>
                <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
                <p><strong>Feels Like:</strong> ${data.main.feels_like}°C</p>
                <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
                <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
                <p><strong>Weather:</strong> ${weatherDesc}</p>
                <p><strong>Pressure:</strong> ${data.main.pressure} hPa</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherContainer = document.getElementById('weatherResult');
            weatherContainer.innerHTML = `<p style="color: red; text-align: center;">⚠️ ${error.message}. Please check your input and try again.</p>`;
        });

}