const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
// import and initiate the Users model to query the database
const Users = mongoose.model("users");

// function for base route on "/"
exports.baseRoute = async (req, res) => {
  res.send("Server Running");
};

// function to get Users on route "/getUsers"
exports.getUsers = async (req, res) => {
  const users = await Users.find();
  res.json(users);
};

// function to create a User
exports.createUser = async (req, res) => {
  if(req.body.Name && req.body.Age && req.body.City){
    // we use mongodb's save functionality here
    await new Users(req.body).save((err, data) => {
      if (err) {
        // if there is an error send the following response
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        // if success send the following response
        res.status(200).json({
          message: "User Created",
          data,
        });
      }
    });
  } else {
      res.status(400).json({ message:"missing parameters."})
  }
};

// function to create many Users at a time
exports.createMultipleUsers = async (req, res) => {
  if(req.body.length>1){
      // we use mongodb's insertMany functionality here
    await Users.insertMany(req.body, function (err, data){
      if (err){
        // if there is an error send the following response
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else{
        // if success send the following response
        res.status(200).json({
          message: "Users Created",
          data,
        });
      }
    })
  } else {
      res.status(400).json({ message:"missing parameters."})
  }
};

// function to get a single User
exports.getSingleUser = async (req, res) => {
  if(req.params.id){
    // get id from URL by using req.params
    let UserID = req.params.id;
    // we use mongodb's findById() functionality here
    await Users.findById({ _id: UserID }, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        console.log(data);      
        res.status(200).json({
          message: "User found",
          data
        });
      }
    });
  } else {
    res.status(400).json({ message:"missing id to fetch user details"})
  }
};

// function to get a Users by age
exports.getUsersByAge = async (req, res) => {
  if(req.params.age){
    // get id from URL by using req.params
    let UserAge = req.params.age;
    // we use mongodb's find() functionality here
    await Users.find({ Age:{$gte:UserAge}}, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        console.log(data);      
        res.status(200).json({
          message: "Users found",
          data
        });
      }
    });
    } else {
      res.status(400).json({ message:"missing age to fetch user details"})
    }
};

// function to update a single User
exports.updateUser = async (req, res) => {
  if(req.params.id){
    // get a UserID.
    let UserID = req.params.id;

    // we will use findByIdAndUpdate function : findByIdAndUpdate(id, data, callback)
    await Users.findByIdAndUpdate({_id: UserID}, {$set : req.body}, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        res.status(200).json({
          message: "User Updated",
          data,
        });
      }
    });
  } else {
    res.status(400).json({ message:"missing id to update user details"})
  }
}

// function to delete a User from the DB
exports.deleteUser = async (req, res) => {
  if(req.params.id){
    let UserID = req.params.id;
    // we use mongodb's deleteOne() functionality here
    await Users.deleteOne({ _id: UserID }, (err, data) => {
      if (err) {
        res.status(500).json({
          message:
            "Something went wrong, please try again later.",
        });
      } else {
        res.status(200).json({
          message: "User Deleted"
        });
      }
    });
  } else {
    res.status(400).json({ message:"missing id to delete user details"})
  }
};
