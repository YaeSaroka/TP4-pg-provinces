//es literalmente BD. 
import config from './../configs/db-config.js';
import pkg from 'pg'
const {Client} = pkg;

export default class ProvinceRepository{
    getAllAsync = async () =>{
        let returnArray= null;
        const client = new Client(config);
        try{
            await client.connect();
            const sql =`SELECT * FROM provinces`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch(error){
            console.log(error);
        }
        return returnArray;
    }

    getByIdAsync = async (id) =>{
        let returnArray= null;
        const client = new Client(config);
        try{
            await client.connect();
            const sql =`SELECT * FROM provinces WHERE id = `+ id;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch(error){
            console.log(error);
        }
        return returnArray;
    }

    createAsync = async (nueva_prov) =>{
        let returnArray= null;
        let name = nueva_prov.name;
        let full_name = nueva_prov.full_name;
        let latitude = nueva_prov.latitude;
        let longitude = nueva_prov.longitude;
        let display_order = nueva_prov.display_order;
        console.log(name);
        const client = new Client(config);
        try{
            await client.connect();
            const sql =`INSERT INTO provinces (name, full_name, latitude, longitude, display_order) VALUES ('${name}', '${full_name}', '${latitude}', '${longitude}', '${display_order}')`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch(error){
            console.log(error);
        }
        return returnArray;
    }

    updateAsync = async (prov_actualizada) =>{
        
        const { id, name, full_name, latitude, longitude, display_order } = prov_actualizada;
        const client = new Client(config);
        let returnArray = 0;
        try{
            await client.connect();
            const sql =`
            UPDATE provinces 
            SET name = $1, full_name = $2, latitude = $3, longitude = $4, display_order = $5 
            WHERE id = $6`;
            //LOS SIGNOS DE $ SON PARA QUE EL CODIGO RECONOZCA EL ORDEN DE LLEGADA POR PARÁMETROS Y PUEDA IR ACOMODÁNDO LOS DATOS SEGÚN CORRESPONDA
            const result = await client.query(sql, [name, full_name, latitude, longitude, display_order, id]); //ACÁ LE PASO EL ORDEN
            returnArray = result.rowCount;
            await client.end();
        } catch(error)
        {
            console.error('Error', error);
        }
        return returnArray;
    }

    deleteAsync = async (id) =>{
        let returnArray= null;
        console.log(id);
        const client = new Client(config);
        try{
            await client.connect();
            const sql =`DELETE FROM provinces WHERE id = '${id}'`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
            console.log(returnArray);
        } catch(error){
            console.log(error);
        }
        return returnArray;
    }
}