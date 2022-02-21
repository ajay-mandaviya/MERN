const User = require("../models/user");
const Order = require("../models/order");

// exports.getAllUser = (req, res ) =>{
//     User.find().exec((err , users)=>{
//         if(err || !users){
//             return res.status(400).json({
//                 error : "No users Found"
//             })
//         }
//         res.json(users)
//     })
// }

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No user found in db",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  return res.json(req.profile);
};
exports.updateUser = () => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "You are not authorized to update this user",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No order in this account",
        });
      }
      return res.json(order);
    });
};

exports.pushOrderInPurchaseList = (req , res , next) => {

    let purchases  = []
    req.body.order.products.forEach(product=>{
        purchases.push({
            _id : product._id,
            name : product.name,
            description : product.description,
            quantity : product.quantity,
            category : product.category,
            amount : req.body.order.amount,
            transcation_id: req.body.order.transcation_id
        })
    })

    User.findOneAndUpdate(
        {_id : req.profile._id},
        {$push : {purchases: purchases}},
        {new : true} ,
        (err , purchase) =>{
            if(err){
                return res.status(400).json({
                    error : "Unable to save purchaselist"
                })
            }
            next();
        }
    )

    
};
