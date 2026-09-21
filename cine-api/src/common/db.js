import { MongoClient } from "mongodb";

const uri = "mongodb://tamaralira_db_user:Palomita0210.@ac-ikgfvqq-shard-00-00.pa6yio6.mongodb.net:27017,ac-ikgfvqq-shard-00-01.pa6yio6.mongodb.net:27017,ac-ikgfvqq-shard-00-02.pa6yio6.mongodb.net:27017/?ssl=true&replicaSet=atlas-qd4ymk-shard-0&authSource=admin&appName=eva-u3-express";

export const client = new MongoClient(uri);
export const dbName = "cine-db";
