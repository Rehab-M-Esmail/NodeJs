const axios = require('axios');

class LaunchesService {
    constructor() {
        this.baseUrl = `https://ll.thespacedevs.com/2.3.0/launches/?mode=list`;
    }

    async getLaunchesList() {
        try {
            const response = await axios.get(this.baseUrl);
            console.log('Launches List:', response.data);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch Launches: ${error.message}`);
        }
    }
}
const launchesService = new LaunchesService();
const launches = launchesService.getLaunchesList().then((data) => {
    console.log('name:', data.results[0].name);
    console.log('last_update:', data.results[0].last_updated);
}

).catch((error) => {
    console.error('Error:', error.message);
});