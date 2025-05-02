import axios from 'axios';

class LaunchesService {
    constructor() {
        this.baseUrl = `https://ll.thespacedevs.com/2.3.0/launches/?mode=list`;
    }

    async getLaunchesList() {
        try {
            const response = await axios.get(this.baseUrl);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to fetch Launches: ${error.message}`);
        }
    }
}

(async () => {
    const launchesService = new LaunchesService();
    try {
        const launches = await launchesService.getLaunchesList();
        console.log("Launches List:");
        launches.results.forEach((launch) => {
            console.log('Name:', launch.name);
            console.log('Last_Updated:', launch.last_updated);
            console.log('slug:', launch.slug);
            console.log('Status:', launch.status.name);
            console.log("--------------------------");
        });
    } catch (error) {
        console.error(error.message);
    }
})();