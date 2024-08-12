const productModel = require('../models/productModels')

//get products url - /api/v1/product
exports.getProducts = async(req,res,next)=>{
       
   const query = req.query.key?{name:{
        $regex:req.query.key,
        $options:'i'
    }}:{}
    
   const product =   await productModel.find(query)
   
    res.json({
        success:true,
        
         product
    })
}
//get singleproducts url - /api/v1/product/:id
exports.getSingleProduct = async(req,res,next)=>{

    
    try {
        const product = await productModel.findById(req.params.id)
         res.json({
             success:true,
             
             product
         })
        
    } catch (error) {
        res.status(404).json({
            success:false,
            message: error.message
        })
    }
}