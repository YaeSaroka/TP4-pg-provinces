import EventLocationRepository from '../repositories/event-locations-repository.js';
import UserService from "./../services/user-service.js";

export default class EventLocationService{
    
    getEventLocationAllAsync = async () =>{
    const repo = new EventLocationRepository();
    const returnArray = await repo.getEventLocationAllAsync();
    return returnArray;

    }
    getEventLocationByIdAsync = async (id) =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.getEventLocationByIdAsync(id);
        return returnArray;
    }

    createEventLocationAsync = async (event_location_nueva) =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.createEventLocationAsync(event_location_nueva);
        return returnArray;
    }
    updateEventLocationAsync = async(event_location_Actualizada) =>{
        const repo = new EventLocationRepository();
        const returnArray = await repo.updateEventLocationAsync(event_location_Actualizada);
        return returnArray;
    }
    
}