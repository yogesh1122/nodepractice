const CartModel = require("../model/cartModel");
const ProductModel = require("../model/productModel");
const { verifyCartData } = require("../service/service");


module.exports.createproduct = async (req, res) => {
  try {
    const product = req.body;

    if (!product)
      return res.status(400).send({ msg: "Product should not be empty" });

    let checkProduct = await ProductModel.find({ name: product.name });

    if (!checkProduct.length == 0)
      return res.status(400).send({ msg: "Product name already exist" });

    let saveProduct = await ProductModel(product).save();

    res.status(200).send({ msg: "Product save successfully", saveProduct });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error in Product saving" });
  }
};

module.exports.addToCart = async(req,res)=>{
   try {
    
    let { items } = req.body;
    let result = verifyCartData(items) 
    const addCart = 0// await CartModel(req.body).save()

    res.status(200).send({mesg:"Cart added successful"})
     
  } catch (error) {
    res.status(500).send({msg:"Internal server Error:- " ,error})
   }
}

module.exports.cartShow = async(req,res)=>{
    try {
      const { id } = req.query;
      let { items } = req.body;

      console.log(items);
      const showCart = await CartModel.find({ user_id:id })
      
      res.status(200).send({ msg:'cart Data here',CartData:showCart })

    } catch (error) {
      res.status(500).send({msg:"Internal server Error :- ", error})
    }
}
// module.exports = { createproduct }
