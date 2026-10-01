const fs=require('fs/promises');
const path=require('path');
const pathToDb=path.join(__dirname,'db.json');
const express=require('express');
const app=express();


let cache={};
app.use(express.json());

async function readFileData(){
    if (cache.products){
        return cache.products;
    }
    let data=await fs.readFile(pathToDb,"utf-8")
    cache.products=JSON.parse(data);
    return cache.products;

}
async function delayReadData(){
    if (cache.products){
        return cache.products;
    }
    await new Promise((resolve,reject)=>{
        setTimeout(resolve,3000)
    })
    return await readFileData();
}


app.get('/products',async (req,res)=>{
    let key=req.url
    let value=cache[key];
    if (value){
        return res.status(200).json(value);
    }
    let products=await delayReadData();
    cache[key]=products;
    res.status(200).json(products);
})



app.get('/products/:id',async (req,res)=>{
    let key=req.url
    let value=cache[key];
    if (value){
        return res.status(200).json(value);
    }
    let products=await readFileData();
    let id=Number(req.params.id);
    let product=products.find(item=>item.id===id);
    if (product){
        cache[key]=product;
        res.status(200).json(product);
    }else{
        res.status(404).json({message:"Product not found"});
    }
})


app.post('/products',async (req,res)=>{
    let products=await readFileData();
    let newProduct=req.body;
    newProduct.id=products.length+1;
    products.push(newProduct);
    await fs.writeFile(pathToDb,JSON.stringify(products));
    cache={};
    res.status(201).json(newProduct);
})


app.put('/products/:id',async (req,res)=>{
    let products=await readFileData();
    let id=Number(req.params.id);
    let productIndex=products.findIndex(item=>item.id===id);
    if (productIndex!==-1){
        let updatedProduct={...req.body,id:id};
        products[productIndex]=updatedProduct;
        await fs.writeFile(pathToDb,JSON.stringify(products));
        cache={};
        res.status(200).json(updatedProduct);
    }else{
        res.status(404).json({message:"Product not found"});
    }
})  

app.patch('/products/:id',async (req,res)=>{
    let products=await readFileData();
    let id=Number(req.params.id);
    let productIndex=products.findIndex(item=>item.id===id);
    if (productIndex!==-1){
        let updatedProduct={...products[productIndex],...req.body};
        products[productIndex]=updatedProduct;
        await fs.writeFile(pathToDb,JSON.stringify(products));
        cache={};
        res.status(200).json(updatedProduct);
    }else{
        res.status(404).json({message:"Product not found"});
    }
})

app.delete('/products/:id',async (req,res)=>{
    let products=await readFileData();
    let id=Number(req.params.id);
    let productIndex=products.findIndex(item=>item.id===id);
    if (productIndex!==-1){
        let deletedProduct=products.splice(productIndex,1)[0];
        await fs.writeFile(pathToDb,JSON.stringify(products));
        cache={};
        res.status(200).json(deletedProduct);
    }else{
        res.status(404).json({message:"Product not found"});
    }
})


app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})



