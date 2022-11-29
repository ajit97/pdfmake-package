const express = require("express");
const PdfPrinter = require("pdfmake");
const documentDefination = require("./document");
const Roboto = require("./font");
const app = express();
var path = require('path');
const axios = require("axios");



async function createPdf(document,callback){
    try{
        const printer = new PdfPrinter(Roboto);
        
        const pdfDoc = printer.createPdfKitDocument(document);

        let chunks = [];
        let result;

        pdfDoc.on('data', (chunk) => {
            chunks.push(chunk);
        });
        pdfDoc.on('end', () => {
            result = Buffer.concat(chunks);
            callback(result);
            // callback('data:application/pdf;base64,' + result.toString('base64'));
        });

        pdfDoc.end();
    }
    catch(e){
        throw e;
    }
}


app.get("/pdf",async (req,resp)=>{

    var result = await axios.get('https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/MauryanCoin.JPG/800px-MauryanCoin.JPG', {
            responseType: 'arraybuffer'
        })
  
    
    const dd = documentDefination(result.data);
    
    createPdf(dd,(binary)=>{
        console.log("Ajit Jitu",binary);
        resp.contentType("pdf");
        resp.send(binary);
    }, (err)=>{
        resp.send(err);
    })
});


app.listen(4000,()=>{
    console.log("Server is listening  on port 4000");
})