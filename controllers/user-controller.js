const { User } = require("../models");

const userController = {
  addUser({ body }, res) {
    console.log(body);
    //creates a new user using body from req
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getAllUser(req, res) {
    //finds all users
    User.find()
      //populates all data from thoughts & reactions schema in the returned user data
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  deleteUserById({ params }, res) {
    //finds user by id and deletes that user
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        //check to see if user id didnt exist in database
        if (!dbUserData) {
          res.status(404).json({ message: "No user by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getUserById({ params }, res) {
    //finds one user by id
    User.findOne({ _id: params.id })
      //populates all data associated to user from thought and reactions schemas
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  updateUserById({ params, body }, res) {
    //finds user by id and updates it with body from request
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  addFriendToUser({ params }, res) {
    //finds one user and add another users id to friends array
    User.findOneAndUpdate(
      { _id: params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user by this id!" });
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  removeFriendFromUser({ params }, res) {
    //finds one user and removes friend from friends array
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
};

module.exports = userController;
