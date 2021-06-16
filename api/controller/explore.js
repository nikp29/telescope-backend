import { firebase } from "../../firebase/config.js";
import shuffle from "shuffle-array";
import moment from "moment";

// const getReels = async (setReelList, setLoading) => {
const getExploreReels = async (req, res) => {
    let reelsRef = firebase.firestore().collection("reels");
    let reelList_ = [];
    await reelsRef
      .orderBy("num_upvotes", "desc")
      // .where("weekstamp", "==", getWeekstamp(moment())) // changing to weekstamp for the demo
      // .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          reelList_.push(data_);
        });
        const response = shuffle(reelList_);
        res.status(200);
        res.json(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
};

const getDaystamp = (moment_) => {
    // get unix days since jan 1st 1970
    return Math.floor(moment_.unix().valueOf() / 86400);
};
  
const getWeekstamp = (moment_) => {
    // get unix weeks since dec 29 monday 1969
    return Math.floor((Math.floor(moment_.unix().valueOf() / 86400) - 4) / 7);
};

export { getExploreReels };