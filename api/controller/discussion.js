import { firebase } from "../../firebase/config.js";
import moment from "moment";


// const pushDiscusion = async ({ title, setError, description }) => {
const uploadDiscussion = async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const discussionRef = firebase.firestore().collection("discussions");
    // const uid = await AsyncStorage.getItem("token");
    const uid = req.body.uid; //change to token
    await discussionRef
      .add({
        title: title,
        description: description,
        discussion_uid: uid,
        upvotes: [],
        num_upvotes: 0,
        num_comments: 0,
        timestamp: moment().unix().valueOf(),
      })
      .catch((error) => {
        setError(error.message);
      });
    res.status(200);
    res.json({
        data: "uploaded"
    });
};

const getDiscussions = async (req, res) => {
  let discussRef = firebase.firestore().collection("discussions");
  let discussionList_ = [];
  await discussRef
    .orderBy("timestamp", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data_ = doc.data();
        data_["id"] = doc.id;
        discussionList_.push(data_);
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
    res.status(200);
    res.json({
      data: discussionList_
    });
};


// const discussionVote = async (upvotes, id, setUpvoted) => {
const discussionVote = async (req, res) => {
  // const uid = await AsyncStorage.getItem("token");
  const uid = req.body.uid;
  const id = req.body.discussionId;
  const upvotes = req.body.upvotes;
  const discussionsRef = firebase.firestore().collection("discussions");

  let new_upvotes = upvotes;
  if (upvotes.includes(uid)) {
    new_upvotes.splice(new_upvotes.indexOf(uid), 1);
    await discussionsRef
      .doc(id)
      .update({ upvotes: new_upvotes, num_upvotes: new_upvotes.length });
    // setUpvoted(false);
  } else {
    // discussion has not already been upvoted
    new_upvotes.push(uid);
    await discussionsRef
      .doc(id)
      .update({ upvotes: new_upvotes, num_upvotes: new_upvotes.length });
    // setUpvoted(true);
  }
  res.status(200).json({
    data : "updated"
  });
};

export { uploadDiscussion, getDiscussions, discussionVote };