//capa intermedia entre controller y repository. el cajero :)
import ProvinceRepository from '../repositories/province-repository.js'

export default class ProvinceService{

    getAllAsync = async () =>{
    const repo = new ProvinceRepository();
    const returnArray = await repo.getAllAsync();
    return returnArray;
}

getByIdAsync = async (id) =>{
    const repo = new ProvinceRepository();
    const returnArray = await repo.getByIdAsync(id);
    return returnArray;
}

createAsync = async (nueva_prov) =>{
    const repo = new ProvinceRepository();
    const returnArray = await repo.createAsync(nueva_prov);
    return returnArray;
}

updateAsync = async(prov_actualizada) =>{
    const repo = new ProvinceRepository();
    const returnArray = await repo.updateAsync(prov_actualizada);
    return returnArray;
}

deleteAsync = async(prov_a_borrar) =>{
    const repo = new ProvinceRepository();
    const returnArray = await repo.deleteAsync(prov_a_borrar);
    return returnArray;
}
}
