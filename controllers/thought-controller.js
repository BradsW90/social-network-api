const { Thought, User } = require("../models");

//Thought object
const thoughtController = {
  //uses json body to create thought
  addThought({ body, params }, res) {
    console.log(body);
    Thought.create(body)
      .then((dbThoughtData) => {
        //finds user and adds new thought to users thoughts array
        return User.findOneAndUpdate(
          { _id: params.id },
          { $push: { thoughts: dbThoughtData } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        //check for if user existed
        if (!dbUserData) {
          res.status(404).json({ message: "No user by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      //error catch all
      .catch((err) => {
        res.json(err);
      });
  },

  getAllThoughts(req, res) {
    //grabs all thoughts
    Thought.find()
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  getThoughtById({ params }, res) {
    //grabs thought by id
    Thought.findOne({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No Thought by that id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    //finds and deletes associated thought by id
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        //find affected user and removes thought from thoughts array
        return User.findOneAndUpdate(
          { _id: params.userid },
          { $pull: { thoughts: params.id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    //finds thought by id and uses body to change specific data
    Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought by that id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    //finds thought by id, then creates reaction by pushing body into reactions array
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought by that id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  removeReaction({ params }, res) {
    //finds thought by id then pulls reactions from reaction array by using reactions id
    Thought.findOneAndUpdate(
      { _id: params.id },
      { $pull: { reactions: { reactionId: params.reactid } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought by that id!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
