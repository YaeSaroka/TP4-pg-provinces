import { Router } from "express";
import ProvinceService from "./../services/province-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";

const router = Router();
const svc= new ProvinceService();

router.get('', async(req, res)=> {
    let respuesta;
    const returnArray = await svc.getAllAsync();
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

router.get('/:id', async(req, res)=> {
    let respuesta;
    const id= req.params.id;
    const returnArray = await svc.getByIdAsync(id);
    if(returnArray != null){
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

router.post('', async(req, res)=> {
    let respuesta, verif;
    const nueva_prov = req.body
    verif = validacionesHelper.getverifTDO(nueva_prov.name, "hola");
    verif = await svc.createAsync(nueva_prov);
    if(verif != null && verif ){
        respuesta = res.status(200).send(`Created.`);
    }
    else  
    respuesta = res.status(400).send(`Error interno.`)
    
    return respuesta;
})

router.put('', async (req, res) => {
    const prov_actualizada = req.body;
    const verif = validacionesHelper.getverifTDO(prov_actualizada.name, "hola");
    if (verif === "hola") //SI ES HOLA ALGO ESTÁ MAL EN LAS VALIDACIONES! ASI QUE YA LO COMUNICO 
    {
        return res.status(400).send('Bad request: el nombre está vacío o contiene menos de 3 caracteres');
    }
    //SINO PRUEBO ESTO!
    try {
        const result = await svc.updateAsync(prov_actualizada);
        if (result > 0) {
            return res.status(200).send('Created. OK');
        } else {
            return res.status(404).send('Not Found: No se encontró una provincia con ese ID.');
        }
    } catch (error) {
        return res.status(500).send('Error interno');
    }
});

router.delete('/:id', async(req, res)=> {
    try{
        const id= req.params.id;
        const returnArray = await svc.deleteAsync(id);
        if(returnArray > 0){
            return res.status(200).send('Deleted');
        }
        else{
            return res.status(404).send(`Not Found.`);
        }
    }
   catch (error){
    return res.status(500).send('Error Interno');
   }
    
})

export default router;