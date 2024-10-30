import UserRepository from '../repositories/user-repository.js';
import jwt from 'jsonwebtoken';

const secretkey= 'Calvesecreta2000$';
const options ={
    expiresIn : '1h',
    issuer : 'mi_organizacion'
}
export default class UserService{
    loginUserAsync = async (nuevo_user) =>{
        const {username, password } = nuevo_user;
        const repo = new UserRepository();
        const returnArray = await repo.loginUserAsync(nuevo_user);
        const payload = {
            id: returnArray.id,
            username: returnArray.username 
        };
        const token= jwt.sign(payload, secretkey, options);
        return {token, payload}; //IMPORTANTE RETORNAR EL TOKEN!
    }
    registerUserAsync = async (nuevo_user) =>{
        const repo = new UserRepository();
        const returnArray = await repo.registerUserAsync(nuevo_user);
        return returnArray;
    }

    findUser = async (id) =>{
        console.log(id, " - id", typeof(id))
        const repo = new UserRepository();
        const returnArray = await repo.findUserAsync(id);
        console.log(returnArray);
        return returnArray;
    }
}
   