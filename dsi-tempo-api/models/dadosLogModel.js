import mongoose from 'mongoose';
const { Schema } = mongoose;

const dadosLog = new Schema({
  data:    String, 
  temperatura: Number,
  cidade: String,
  sensacaoTermica: Number,
  umidade: Number,
  tempo: String
  
});

 export const dadosLogModel= mongoose.model("dadosLog", dadosLog);