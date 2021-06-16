import { firebase } from "../../firebase/config.js";


// const getComments = async (id, setComments) => {
const reelComments = async (req, res) => {
    const id = req.body.id;      
    let comments = [];
    await firebase
        .firestore()
        .collection(`reels/${id}/comments`)
        .orderBy("num_upvotes", "desc")
        .orderBy("timestamp", "desc")
        .get()
        .then((querySnapshot) => {
            comments = querySnapshot.docs.map((doc) => {
                let data_ = doc.data();
                data_["id"] = doc.id;
                return data_;
            });
        });
    res.json({
        data: comments
    });
};

const discussionComments = async (req, res) => {
    const id = req.body.id;
    let comments = [];
    await firebase
      .firestore()
      .collection(`discussions/${id}/comments`)
      .orderBy("num_upvotes", "desc")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        comments = querySnapshot.docs.map((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          return data_;
        });
      });
    res.json({
        data: comments
    });
  };

export { reelComments, discussionComments };