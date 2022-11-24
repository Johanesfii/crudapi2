const parameters = require('../parameters');
const {MongoClient, ObjectId, ObjectID} = require('mongodb');
const ObjId = require('mongodb').ObjectId;

// create
async function createCustomer(customers){
    const mongoClient = new MongoClient(parameters.MongoDBConnection);
    return await Create(mongoClient, customers);
}

// delete
async function deleteCustomer(id){
    const mongoClient = new MongoClient(parameters.MongoDBConnection);
    return await Delete(mongoClient, id);
}

// update
async function updateCustomer(id, customers){
    const mongoClient = new MongoClient(parameters.MongoDBConnection);
    return await Update(mongoClient, id, {
        name: customers.name,
        age: customers.phone,
        address: customers.address,
    });
}

// get
async function getCustomerById(id){
    const mongoClient = new MongoClient(parameters.MongoDBConnection);
    return await GetOne(mongoClient, id);
}

// get by id
async function getCustomers(){
    const mongoClient = new MongoClient(parameters.MongoDBConnection);
    return await GetAll(mongoClient);
}

// private method for db connection
async function OpenConection(mongoClient){
    try{
        await mongoClient.connect();
    }catch(e){
        console.error(e);
    };
}

// private method for close db connection
async function CloseConnection(mongoClient){
    try{
        await mongoClient.close();
    }catch(e){
        console.error(e);
    };
}

// private method for insert customer
async function Create(mongoClient, customers){
    try{
        OpenConection(mongoClient);
        return await mongoClient.db(parameters.database)
                    .collection(parameters.collection)
                    .insertOne(customers);
    }catch(error){
        console.error(error);
    }finally{
        CloseConnection(MongoClient);
    }
}

// private methode for delete customer
async function Delete(mongoClient, id){
    try{
        OpenConection(mongoClient);
        return await mongoClient.db(parameters.database)
                    .collection(parameters.collection)
                    .deleteOne({_id: ObjId(id)});
    }catch(error){
        console.error(error);
    }finally{
        CloseConnection(mongoClient);
    }
}

// private method for update customer
async function Update(mongoClient, id, updateFields){
    try{
        OpenConection(mongoClient);
        return await mongoClient.db(parameters.database)
                    .collection(parameters.collection)
                    .updateOne({_id: ObjId(id)}, {$set: updateFields});
    }catch(error){
        console.error(error);
    }finally{
        CloseConnection(mongoClient);
    }
}

// private method for get customer by id
async function GetOne(mongoClient, id){
    try{
        OpenConection(mongoClient);
        return await mongoClient.db(parameters.database)
                    .collection(parameters.collection)
                    .findOne({_id: ObjId(id)});
    }catch(error){
        console.error(error);
    }finally{
        CloseConnection(mongoClient);
    }
}

// private method for get customers
async function GetAll(mongoClient){
    try{
        OpenConection(mongoClient);
        return await mongoClient.db(parameters.database)
                    .collection(parameters.collection)
                    .find({}).toArray();
    }catch(error){
        console.error(error);
    }finally{
        CloseConnection(mongoClient);
    }
}

// exports methods to public methods
module.exports = {createCustomer, deleteCustomer, updateCustomer, getCustomerById, getCustomers};