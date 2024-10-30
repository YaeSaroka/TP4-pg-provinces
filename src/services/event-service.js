import EventRepository from '../repositories/event-repository.js';

export default class EventService {
    /*CRUD********************************************************************/
    BusquedaEventsAsync = async (evento_nuevo) => {
        const repo = new EventRepository();
        const returnArray = await repo.BusquedaEventsAsync(evento_nuevo);
        return returnArray;
    }
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

    //DETALLE EVENTO
    getDetalleEvento = async (id,limit,offset) => {
        const repo = new EventRepository();
        const returnArray = await repo.getDetalleEvento(id,limit,offset);
        return returnArray;
    }
    /*revisar*/
    getAllEvents = async (id,limit,offset) => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllEvents(id,limit,offset);
        return returnArray;
    }

}