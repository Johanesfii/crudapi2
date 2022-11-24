class Customer
{
    constructor(name, phone, address, created_at)
    {
        this.name = name;
        this.phone = phone;
        this.address = address;
        this.created_at = created_at;
    }
}

module.exports = {Customer};