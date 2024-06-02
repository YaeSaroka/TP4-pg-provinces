import LocationRepository from '../repositories/location-repository.js';

export default class LocationService{
    
    getLocationAllAsync = async () =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getLocationAllAsync();
        return returnArray;
    }

    getLocationByIdAsync = async (id) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getLocationByIdAsync(id);
        return returnArray;
    }
    getLocationByIdAsync = async (id) =>{
        const repo = new LocationRepository();
        const returnArray = await repo.getLocationByIdAsync(id);
        return returnArray;
        }
}
