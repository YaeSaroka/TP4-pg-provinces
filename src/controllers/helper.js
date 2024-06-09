import { Router } from "express";
import HelperService from "./../services/helper.js"

const router = Router();
const svc = new HelperService();

router.get('/:id', async (req, res) => {
    let respuesta;
    const id = req.params.id;
    const returnArray = await svc.selectmax_capacity(id);
    if (returnArray != null) {
        respuesta = res.status(200).json(returnArray);
    }
    else respuesta = res.status(500).send(`Error interno.`)
    return respuesta;
})

  export default router;
