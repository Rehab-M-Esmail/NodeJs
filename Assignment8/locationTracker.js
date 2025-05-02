const axios = require('axios');
class LocationTrackerService {
    constructor() {
        this.baseUrl = 'http://api.open-notify.org/iss-now.json';
    }

    async getLocation() {
        try {
            const response = await axios.get(this.baseUrl);
            const { latitude, longitude } = response.data.iss_position;
            //console.log('Latitude:', latitude);
            const timestamp = response.data.timestamp;
                console.log('Current Location:');
                console.log('Latitude:', latitude);
                console.log('Longitude:', longitude);
                console.log('Timestamp:', timestamp);
        } catch (error) {
            console.log(`Failed to fetch location : ${error.message}`);
        }
    }
}
const locationTrackerService = new LocationTrackerService();
console.log('Starting APOD polling...');
setInterval( async () => {
    await locationTrackerService.getLocation();
}
    , 10000);