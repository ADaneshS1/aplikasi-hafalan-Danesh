const {MongoClient} = require("mongodb")

const { insertMany, insertOne } = require('./function/ExampleInsert');
const { findMany, findOne, findOneById, findOneWithQuerySpecific,isIdExist } = require('./function/ExampleFind');
const { deleteById } = require('./function/ExampleDelete');
const { updateById } = require('./function/ExampleUpdate');

async function run() {
    const url = 'mongodb+srv://ppqita:santri@ppqitadb.dada60q.mongodb.net/';
    const {collection, client} = await connectionDB(url, 'testing','users')
  
      await cleanDB(collection);
  
      let myData = [  
        {
            id: 1,
            halaman: 17,
            catatan:"sudah",
            status: true,
            
        },
        {
            id: 2,
            halaman: 20,
            catatan:"sudah",
            status: true,
        },
        {
            id: 3,
            halaman: 117,
            catatan:"sudah",
            status: true,
        },
    ]
  
    let dataRes3 = await insertMany(collection,myData);
    // let dataRes4 = await updateById(collection,2,{name:"orang"});
    // let dataRes5 = await deleteById(collection,3);
    let dataRes6 = await isIdExist(collection,10);
    console.log(dataRes6)
  
    await client.close();
  }
  
  const cleanDB = async (collection) => {
    try {
      let dataRes = await findMany(collection);
  
      for (const data of dataRes) {
        await deleteById(collection, data.id);
      }
    } catch (err) {
      console.log('Error clean DB: ', err)
    }
  }
  
  const connectionDB = async (url,dbName,collectionName) => {
    try {
      const client = new MongoClient(url);
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection(collectionName)
      return {collection, client}
    } catch (err) {
      console.log('Error connection DB: ', err)
    }
  }
  
  run().catch(console.dir);