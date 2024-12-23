/* Fetch API Key from Server */
const fetchApiKey = async () => {
  try {
    const response = await fetch('/key');
    const data = await response.json();
    return data.key;
  } catch (error) {
    console.error('Error fetching API key:', error);
  }
};

/* GET Weather Data */
const getWeatherData = async (zipCode) => {
  try {
    const apiKey = await fetchApiKey();
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`;
    const response = await fetch(weatherApiUrl);
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
