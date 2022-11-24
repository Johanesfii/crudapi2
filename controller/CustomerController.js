const dbCore = require('../core/dbCore');

// method for get customers
const getCustomers = async (req, res) => {
    const customer = await dbCore.getCustomers()
    if(!customer) return res.status(204).json({'message': 'No customer found.'});
    res.json(customer);
}

// method for get customer by id
const getCustomerById = async(req, res) => {
    const customer = await dbCore.getCustomerById(req.params.id);
    if(!customer) return res.status(204).json({'message': 'No customer found.'});
    res.json(customer);
}

// method for delete customer
const deleteCustomer = async(req, res) => {
    const result = await dbCore.deleteCustomer(req.params.id);
    res.json(result);
}

// method for insert customer
const createCustomer = async(req, res) => {
    var date = new Date().toLocaleString('id-ID');
    const result = await dbCore.createCustomer({
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        created_at: date,
        __v: 0,
    });
    res.json(result);
}

// method for update customer
const updateCustomer = async(req, res) => {
    const result = await dbCore.updateCustomer(req.params.id, {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
    });
    res.json(result);
}

// export method to public method
module.exports = {getCustomers, getCustomerById, deleteCustomer, createCustomer, updateCustomer};