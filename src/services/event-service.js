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
    updateEventAsync = async (evento_actualizado) => {
        const repo = new EventRepository();
        const returnArray = await repo.updateEventAsync(evento_actualizado);
        return returnArray;
    }
    deleteEventAsync = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.deleteEventAsync(id);
        return returnArray;
    }

}