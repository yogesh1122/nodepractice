const user = require("../routes/userRoutes")
const product = require("../routes/productRoutes")

module.exports= (app) =>
{
   app.use('/api/user',user) 
   app.use('/api/product',product)
 
}