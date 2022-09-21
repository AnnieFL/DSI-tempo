import  { dadosLogModel }  from '../models/dadosLogModel.js';
import { ObjectId } from 'mongodb'   



export const getDadosLog = async(req,res) =>{;
    try{
        const dbs = dadosLogModel.db;
        const coll = dbs.collection("dadoscollection");

        //rest = await coll.find();
        let rest = await coll.find({}).toArray();
        res.json(rest);
        

    }catch(error){
        console.log("Error " + error);
        res.status(404).json({error: error.message});
    }
}



export const  saveDadosLog = async (req,res) => {
   
    const dadosInfo = {
        data: req.body.data, // 
        temperatura: req.body.temperatura,
        cidade: req.body.cidade,
        sensacaoTermica: req.body.sensacaoTermica,
        umidade: req.body.umidade,
        tempo: req.body.tempo
};
    try{
        const dbs = dadosLogModel.db;
        const coll = dbs.collection("dadoscollection");

        const rest = await coll.insertOne(dadosInfo);
        
        res.status(200).json({message_success:"Data saved successfully"});

    }catch(ex){
        console.log("Error " + ex);
    }
   
}





