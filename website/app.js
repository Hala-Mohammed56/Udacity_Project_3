// Personal API Key
const weatherApiKey = 'e18d73a7afec3e6743d8063bd8c17a6b&units=imperial';// did not work with me i try to generate another api but still dose not work
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather?zip=';

/* GET Weather Data */
const getWeatherData = async (zipCode) => {
  try {
    const response = await fetch(`${weatherApiUrl}${zipCode}&appid=${weatherApiKey}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

/* POST data to the server */
const postData = async (url = '', data = {}) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const newData = await response.json();
    console.log('Response from server:', newData);
    return newData;
  } catch (error) {
    console.error('Error posting data:', error);
  }
};

/* Update the UI */
const updateUI = async () => {
  try {
    const request = await fetch('/all');
    const allData = await request.json();
    document.getElementById('date').innerHTML = `Date: ${allData.date}`;
    document.getElementById('temp').innerHTML = `Temperature: ${Math.round(allData.temperature)}°F`;
    document.getElementById('content').innerHTML = `Feelings: ${allData.userResponse}`;
  } catch (error) {
    console.error('Error updating UI:', error);
  }
};

/* Event Listener for Button */
document.getElementById('generate').addEventListener('click', async () => {
  // Get user inputs
  const zipCode = document.getElementById('zip').value;
  const feelings = document.getElementById('feelings').value;

  // Fetch weather data
  const weatherData = await getWeatherData(zipCode);

  // Check the validity
  if (weatherData && weatherData.main) {
    // Prepare data for POST
    const postDataObj = {
      temperature: weatherData.main.temp,
      date: new Date().toLocaleDateString(),
      userResponse: feelings,
    };

    // Send data and update the UI
    await postData('/add', postDataObj);
    updateUI();
  } else {
    console.error('Invalid ZIP code or failed API request.');
  }
});
