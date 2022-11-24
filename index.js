const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

var app = express();
var port = process.env.port || 3001;
const customerController = require('./controller/CustomerController');

app.use(cors());
app.use(bodyParser.json());

const router = express.Router();
router.get("/customers/", customerController.getCustomers);
router.get("/customers/:id/", customerController.getCustomerById);
router.delete("/customers/:id/", customerController.deleteCustomer);
router.post("/customers/", customerController.createCustomer);
router.put("/customers/:id/", customerController.updateCustomer);

app.use("/api", router);

app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log(`Server started on port: ${port}`);
});