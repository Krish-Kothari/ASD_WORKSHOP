const productDatabase=require('../database/productDatabase');

async function getProducts(){
    return productDatabase.getProducts();
}

async function getProductById(id){
    const products=await productDatabase.getProducts();
    return products.find((product) => product.id === id);
}

async function createProduct(productData){
    const products=await productDatabase.getProducts();
    const newProduct={...productData,id:products.length+1};
    products.push(newProduct);
    await productDatabase.saveProducts(products);
    return newProduct;
}

async function updateProduct(id,productData,partial){
    const products=await productDatabase.getProducts();
    const productIndex=products.findIndex((product)=>product.id===id);
    if (productIndex === -1) return undefined;

    const updatedProduct=partial?{...products[productIndex],...productData,id}:{...productData,id};
    products[productIndex]=updatedProduct;
    await productDatabase.saveProducts(products);
    return updatedProduct;
}

async function deleteProduct(id){
    const products=await productDatabase.getProducts();
    const productIndex=products.findIndex((product)=>product.id===id);
    if (productIndex === -1) return undefined;

    const [deletedProduct]=products.splice(productIndex,1);
    await productDatabase.saveProducts(products);
    return deletedProduct;
}

module.exports={
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};