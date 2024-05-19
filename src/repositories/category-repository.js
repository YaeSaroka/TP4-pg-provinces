//PROCEDURES/QUERYS DE BD
import config from './../configs/db-config.js';
import pkg from 'pg'
const { Client } = pkg;

export default class CategoryRepository {
    getCategoryAllAsync = async () => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `SELECT * FROM event_categories`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;

        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    getCategoryByIdAsync = async (id) => {
        let returnArray = null;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
            SELECT * FROM event_categories 
            WHERE id = ` + id;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }

    createCategoryAsync = async (categoria_nueva) => {
        let returnArray = null;
        let name = categoria_nueva.name;
        let display_order = categoria_nueva.display_order;
        console.log(name);
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
            INSERT INTO event_categories (name, display_order) 
            VALUES ('${name}', '${display_order}')`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    
    updateCategoryAsync = async (actualized_category) => {
        const { id, name, display_order } = actualized_category;
        const client = new Client(config);
        let returnArray = 0;
        try {
            await client.connect();
            const sql = `
                UPDATE event_categories 
                SET name = $1, display_order = $2 
                WHERE id = $3`;
            //LOS SIGNOS DE $ SON PARA QUE EL CODIGO RECONOZCA EL ORDEN DE LLEGADA POR PARÁMETROS Y PUEDA IR ACOMODÁNDO LOS DATOS SEGÚN CORRESPONDA
            const result = await client.query(sql, [name, display_order, id]); //ACÁ LE PASO EL ORDEN
            returnArray = result.rowCount; 
            await client.end();
        } catch (error) {
            console.error('Error', error);
        }
        return returnArray;
    };

    deleteCategoryAsync = async (id) =>{
        let returnArray= 0;
        console.log(id);
        const client = new Client(config);
        try{
            await client.connect();
            const sql =`
            DELETE FROM event_categories 
            WHERE id = '${id}'`;
            const result = await client.query(sql);
            await client.end();
            returnArray = result.rowCount;
            console.log(returnArray);
        } catch(error){
            console.error('Error', error);
        }
        return returnArray;
    }


}