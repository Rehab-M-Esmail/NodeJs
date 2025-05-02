const axios = require('axios');

class NasaService {
    constructor() {
        this.apiKey = 'Your_NASA_API_Key'; // Replace with your actual NASA API key
        // You can get a free API key from https://api.nasa.gov/
        this.baseUrl = `https://api.nasa.gov/planetary/apod?api_key=`;
    }

    async getCurrentDayImage() {
        try {
            const response = await axios.get(`${this.baseUrl}${this.apiKey}`);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch current day image data: ${error.message}`);
        }
    }
}
const nasaService = new NasaService();
nasaService.getCurrentDayImage().then((data) => {
    console.log('Current Day Image Data:');
    console.log('Title:', data.title);
    console.log('Date:', data.date);
    console.log('Explanation:', data.explanation);

}
).catch((error) => {
    console.error('Error:', error.message);
});