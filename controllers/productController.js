const productService=require('../services/productService');

async function getProducts(req,res){
    res.status(200).json(await productService.getProducts());
}

async function getProductById(req,res){
    const product=await productService.getProductById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
}

async function createProduct(req,res){
    res.status(201).json(await productService.createProduct(req.body));
}

async function updateProduct(req,res,partial){
    const product=await productService.updateProduct(Number(req.params.id),req.body,partial);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
}

async function putProduct(req,res){
    return updateProduct(req, res, false);
}

async function patchProduct(req,res){
    return updateProduct(req, res, true);
}

async function deleteProduct(req,res){
    const product=await productService.deleteProduct(Number(req.params.id));
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
}

module.exports={
    getProducts,
    getProductById,
    createProduct,
    putProduct,
    patchProduct,
    deleteProduct
};