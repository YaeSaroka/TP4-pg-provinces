import EventRepository from '../repositories/event-repository.js';

export default class EventService{
    getEventAllAsync = async () =>{
    const repo = new EventRepository();
    const returnArray = await repo.getEventAllAsync();
    return returnArray;

}



}