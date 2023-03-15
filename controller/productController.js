const CartModel = require("../model/cartModel");
const ProductModel = require("../model/productModel");
const Razorpay = require("razorpay");

const {
  verifyCartData,
  checkallproductPrice,
  totalPrice,
} = require("../service/service");



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

module.exports.addToCart = async (req, res) => {
  try {
    let { items } = req.body;
    const addCart = await CartModel(req.body).save();
    res.status(200).send({ mesg: "Cart added successful" });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error:- ", error });
  }
};

module.exports.cartShow = async (req, res) => {
  try {
    const { id } = req.query;
    let { items } = req.body;

    console.log(items);
    const showCart = await CartModel.find({ user_id: id });

    res.status(200).send({ msg: "cart Data here", CartData: showCart });
  } catch (error) {
    res.status(500).send({ msg: "Internal server Error :- ", error });
  }
};

module.exports.checkOut = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: "rzp_test_g1oWpayOkFdrZ4",
      key_secret: "fKk7sACpIUpNYEXVddRMT583",
    });


    const { id } = req.query;
    // console.log(id);
    let userCart = await CartModel.findOne({ user_id: id });
    // console.log(typeof userCart);
    let pid = await userCart.items.map((it) => it.product_id);

    let rs = await checkallproductPrice(pid);
    let DBtotalPrice = totalPrice(rs, userCart);

    if (!(userCart.total_price == DBtotalPrice))
      return res.status(403).send({ msg: "malicious activity found" });
    
    // Payment **

      const options = {
        amount: Number(DBtotalPrice) * 100, // amount in paise
        currency: "INR",
        receipt: "order_rcptid_11",
        payment_capture: 1,
      };   
    /*
    // Order Creation ==#==
    let orderData = await razorpay.orders.create(options) 
    console.log("^^**",orderData);
    let paymentId = orderData.id 
    //Order or payment capture
   let paymentdata = await razorpay.payments.capture(paymentId,DBtotalPrice * 100) 
    console.log("unhandle Rej error ",paymentdata);
     res.status(200).send({ userCart, rs, result: DBtotalPrice,paymentdata });
  }
  */
  let payment1;
  try {
    payment1 = await razorpay.orders.create(options);
    console.log('payordercreations',payment1);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to create payment' });
  }
  
  // Capture the payment
  try {
    console.log('====##==',typeof DBtotalPrice,payment1.id);
    const captureResponse = await razorpay.payments.capture('LRvaU22WZKdnFO',payment1.amount);
    console.log('Payment captured:', captureResponse);
    // Update your order status or handle successful payment
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to capture payment' });
  }

}catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Internal server error :- ", error });
  } 

}  




