import EventRepository from '../repositories/event-repository.js';

export default class EventService {
    getEventAllAsync = async (params) => {
        console.log(params);
        const repo = new EventRepository();
        const returnArray = await repo.getEventAllAsync(params);
        return returnArray;
    }
    

    /*CRUD********************************************************************/

    createEventAsync = async (evento_nuevo) => {
        const repo = new EventRepository();
        const returnArray = await repo.createEventAsync(evento_nuevo);
        return returnArray;
    }

}