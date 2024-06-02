import jwt from 'jsonwebtoken';

class JwtHelper{
     desencriptarToken = async (token) => {
        let payloadoriginal= null;
        const secretkey= 'Calvesecreta2000$';
        try{
            payloadoriginal = await jwt.verify(token, secretkey);
        }
        catch(e){
            console.error(e);
        }
        return payloadoriginal;
}
}
export default new JwtHelper;
