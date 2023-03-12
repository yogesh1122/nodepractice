const ProductModel = require("../model/productModel");

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

// module.exports = { createproduct }
