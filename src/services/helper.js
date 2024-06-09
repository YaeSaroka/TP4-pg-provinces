import HelperRepository from '../repositories/helper.js';

export default class HelperService{
    selectmax_capacity = async (id_event_location) =>{
        const repo = new HelperRepository();
        const returnArray = await repo.selectmax_capacity(id_event_location);
        return returnArray;
    }
}