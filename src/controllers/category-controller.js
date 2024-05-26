import { Router } from "express";
import CategoryService from "./../services/category-service.js";
import validacionesHelper from "../helpers/validaciones-helper.js";

const router = Router();
const svc = new CategoryService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray = await svc.getCategoryAllAsync();
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

router.get('/:id', async (req, res) => {
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.getCategoryByIdAsync(id);
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

router.post('', async (req, res) => {
    const categoria_nueva = req.body
    let verif = validacionesHelper.getverifTDO(categoria_nueva.name, "hola");
    verif = await svc.createCategoryAsync(categoria_nueva);
    if (verif === "hola")  
    {
        return res.status(400).send('Bad request: el nombre está vacío o contiene menos de 3 caracteres');
    }
    try {
        const result = await svc.createCategoryAsync(categoria_nueva);
        if (result > 0) {
            return res.status(200).send('Created. OK');
        } 
    } catch (error) {
        return res.status(500).send('Error interno');
    }
})

router.put('', async (req, res) => {
    const actualized_category = req.body;
    const verif = validacionesHelper.getverifTDO(actualized_category.name, "hola");
    if (verif === "hola")  //SI ES HOLA ALGO ESTÁ MAL EN LAS VALIDACIONES! ASI QUE YA LO COMUNICO 
    {
        return res.status(400).send('Bad request: el nombre está vacío o contiene menos de 3 caracteres');
    }
    //SINO PRUEBO ESTO!
    try {
        const result = await svc.updateCategoryAsync(actualized_category);
        if (result > 0) {
            return res.status(200).send('Created. OK');
        } else {
            return res.status(404).send('Not Found: No se encontró una categoría con ese ID.');
        }
    } catch (error) {
        return res.status(500).send('Error interno');
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const returnArray = await svc.deleteCategoryAsync(id);

        if(returnArray >0){
            return res.status(200).send('Deleted');
        }
        else{
            return respuesta = res.status(404).send(`Not Found.`)
        }
    }
    catch (error)
    {
        return res.status(500).send('Error Interno');
    }
})


export default router;