import { Router } from "express";
import UserService from "./../services/user-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";

const router = Router();
const svc = new UserService();

let token;
router.post('/login', async (req, res) => {
    try{
        const nuevo_user = req.body;
        var result = await svc.loginUserAsync(nuevo_user);
        token=result.token;
        console.log(nuevo_user);
        return res.status(200).json({ success: true, token: result.token, result: result });
        
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Usuario o contraseña inválidos' });
    }  
})

router.post('/register', async (req, res) => {
    const nuevo_user = req.body
    let verif= validacionesHelper.getverifTDO(nuevo_user.first_name, "hola");
    let check_last_name = validacionesHelper.getverifTDO(nuevo_user.last_name, "hola");
    let check_username= validacionesHelper.getVerificacionMail(nuevo_user.username, "mail");
    let check_password= validacionesHelper.getverifTDO(nuevo_user.password, "hola");

    if (verif === "hola" || check_last_name === "hola" || check_password==="hola" ) {
        return res.status(400).json({ success: false, message: 'Bad request: el nombre / apellido / contraseña está vacío o contiene menos de 3 caracteres' });
    }
    if (check_username === "mail") {
        return res.status(400).json({ success: false, message: 'Bad request: el email para el campo username es inválido.' });
    }

    try {
        const result = await svc.registerUserAsync(nuevo_user);
        if (result) {
            return res.status(200).json({ success: true, message: 'Created. OK' });
        } else {
            return res.status(500).json({ success: false, message: 'Error interno: no se pudo registrar el usuario.' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Error interno' });
    }
});

router.get('/find', async (req, res) => {
    try{
        var { id }  = req.body;
        var respuesta;
        console.log(id, " - id controller", typeof(id));
        var returnArray = await svc.findUser(id);
        if (returnArray != null) {
            respuesta = res.status(200).json(returnArray);
          } else {
            respuesta = res.status(500).send(`Error interno.`);
          }
        
    } catch (error) {
        respuesta = res.status(401).json({ success: false, message: 'Usuario o contraseña inválidos' });
    } 
    return respuesta;
})



export default router;