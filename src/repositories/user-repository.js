import config from './../configs/db-config.js';
import pkg from 'pg'
const { Client } = pkg;

export default class UserRepository {
    loginUserAsync = async (nuevo_user) => {
        let returnArray = null;
        const {username, password } = nuevo_user;
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
            SELECT * FROM users
            WHERE username=$1 
            AND password=$2`;
            const result = await client.query(sql,[username,password]);
            await client.end();
            returnArray = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }

     registerUserAsync = async (newUser) => {
        const client = new Client(config);
        let returnArray = null;
        const { first_name, last_name, username, password } = newUser;
        try {
            await client.connect();
            const sql = `
                INSERT INTO users (first_name, last_name, username, password) 
                VALUES ($1, $2, $3, $4) RETURNING *`;
            const result = await client.query(sql, [first_name, last_name, username, password]);
            
            await client.end();
            returnArray= result.rows[0];
            console.log(result.rows[0]);
        } catch (error) {
            console.log(error);
        }
        return returnArray;
    }
    
    findUserAsync = async (id) => {
        let returnArray = null;
        console.log(id, " -  repo ", typeof(id))
        const client = new Client(config);
        try {
            await client.connect();
            const sql = `
            SELECT first_name, last_name FROM users
            WHERE id=$1
            `;
            const result = await client.query(sql,[id]);
            await client.end();
            returnArray = result.rows[0];
        } catch (error) {
            console.log(error);
        }
        console.log(returnArray, " - returnarra")
        return returnArray;
    }
}

