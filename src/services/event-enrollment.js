import EventEnrollmentRepository from "../repositories/event-enrollment.js";
import UserService from "./../services/user-service.js";

export default class EventEnrollementService{
    getEventEnrollmentAllAsync = async (params) => {
        console.log(params);
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.getEventEnrollmentAllAsync(params);
        return returnArray;
    }
    patchEventRating = async (params, user_id, event_id) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.patchEventRating(params, user_id, event_id);
        return returnArray;
    }
    registerUserEventEnrollment= async (id_event, description, id_user) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.registerUserEventEnrollment(id_event, description, id_user);
        return returnArray;
    }
    deleteUserFromEventEnrollmentAsync = async (id_user, id_event) => {
        const repo = new EventEnrollmentRepository();
        const returnArray = await repo.deleteUserFromEventEnrollmentAsync(id_user, id_event);
        return returnArray;
    }

}