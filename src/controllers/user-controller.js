import { Router } from "express";
import UserService from "./../services/user-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";

const router = Router();
const svc = new UserService();

router.post('/login', async (req, res) => {
    try{
        const nuevo_user = req.body;
        const result = await svc.loginUserAsync(nuevo_user);
        res.status(200).json({ success: true, token: result.token });
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    
})

router.post('/register', async (req, res) => {
    const nuevo_user = req.body
    let verif= validacionesHelper.getverifTDO(nuevo_user.first_name, "hola");
    let check_last_name = validacionesHelper.getverifTDO(nuevo_user.last_name, "hola");
    let check_username= validacionesHelper.getVerificacionMail(nuevo_user.username, "mail");
    let check_password= validacionesHelper.getverifTDO(nuevo_user.password, "hola");
    if (verif === "hola" || check_last_name === "hola" || check_password==="hola" )  //SI ES HOLA ALGO ESTÁ MAL EN LAS VALIDACIONES! ASI QUE YA LO COMUNICO 
    {
        return res.status(400).send('Bad request: el nombre / apellido / contraseña está vacío o contiene menos de 3 caracteres');
    }
    if (check_username === "mail")
    {
        return res.status(400).send('Bad request: el email para el campo username es inválido.');
    }
    //SINO PRUEBO ESTO!
    try {
        const result = await svc.registerUserAsync(nuevo_user);
        if (result) {
            return res.status(200).send('Created. OK');
        } 
    } catch (error) {
        return res.status(500).send('Error interno');
    }
})

export default router;