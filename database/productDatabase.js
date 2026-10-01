const fs=require('fs/promises');
const path=require('path');

const pathToDb=path.join(__dirname,'..','db.json');

async function getProducts(){
    const data=await fs.readFile(pathToDb,'utf-8');
    return JSON.parse(data);
}

async function saveProducts(products){
    await fs.writeFile(pathToDb,JSON.stringify(products,null,2));
}

module.exports={getProducts,saveProducts};