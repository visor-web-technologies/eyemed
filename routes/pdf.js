const router = require("express").Router();
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const puppeteer = require('puppeteer');


// gater products in cart 
function get_products(req){
    const old_products = req.session.cart.products;
    const new_products = [];
    old_products.forEach(product => {
        const this_p = {
            name : product.title,
            qty : product.qty,
            price : product.price,
            subTotal : product.subTotal
        }
        new_products.push(this_p);
    });
    return new_products;
}


////////////////////////
function get_price(req){
    return req.session.cart.price;
}


//////////////////////////////////////////////////
router.post("/generate_pdf", (req, res, next) => {

    const name = req.body.name;
    const cname = req.body.cname;
    const address = req.body.address;
    const phone = req.body.phone;

    const data = {
        "customer name" : name,
        "company name" : cname,
        "address" : address,
        "phone" : phone
    }

    console.log("Customer Details");
    console.table(data);

    try {
        (async () => {
    
            var dataBinding = {
                items: get_products(req),
                total: get_price(req),
                address: address,
                name: name,
                phone: phone,
                cname: cname,
                isWatermark: false,
            }
    
            // var templateHtml = fs.readFileSync(path.join(process.cwd(), 'invoice.html'), 'utf8');

            var templateHtml = fs.readFileSync(path.join(process.cwd(), 'invoice.html'), 'utf8');
            var template = handlebars.compile(templateHtml);
            var finalHtml = encodeURIComponent(template(dataBinding));

            const fileNum = Math.floor(Math.random()*1000);

            const fileName = `${cname} - Eyemed Optical Suppliers Quotaion - ${fileNum}`;
    
            var options = {
                format: 'A4',
                headerTemplate: "<p></p>",
                footerTemplate: "<p></p>",
                displayHeaderFooter: false,
                margin: {
                    top: "40px",
                    bottom: "100px"
                },
                printBackground: true,
                path: `${fileName}.pdf`
            }
            
            const browser = await puppeteer.launch({
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });

            const page = await browser.newPage();

            await page.goto(`data:text/html;charset=UTF-8,${finalHtml}`, {
                waitUntil: 'networkidle0'
            });
            
            await page.pdf(options);
            await browser.close();
    
            console.log(`Done: ${fileName}.pdf was created!`);

            const file = `${__dirname}/./../${fileName}.pdf`

            // output
            res.download(file);

        })();

    } catch (err) {
        console.log('ERROR:', err);
    }

});

module.exports = router;




