const Data = require("../models/data_entry");

async function get_data(){

    const phone = await Data.findOne({ slug : "phone-one" });
    const phone1 = await Data.findOne({ slug : "phone-two" });
    const email = await Data.findOne({ slug : "email-one" });
    const email1 = await Data.findOne({ slug : "email-two" });

    const data = {
        phoneOne : phone,
        phoneTwo : phone1,
        emailOne : email,
        emailTwo : email1
    }

    return data;

}

module.exports = get_data;