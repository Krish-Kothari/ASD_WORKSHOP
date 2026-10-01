const express=require('express');
const productController=require('../controllers/productController');

const router=express.Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/', productController.createProduct);
router.put('/:id', productController.putProduct);
router.patch('/:id', productController.patchProduct);
router.delete('/:id', productController.deleteProduct);

module.exports=router;