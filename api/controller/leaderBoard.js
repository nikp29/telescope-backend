import { firebase } from "../../firebase/config.js";
import moment from "moment";

// const getLeaderBoard = async (setReelList, numDisplayed, isWeek) => {
const getLeaderBoard = async (req, res) => {
    const isWeek = false;
    const numDisplayed = 3;
    let reelsRef = firebase.firestore().collection("reels");
    let reelList_ = [];
    if (isWeek) {
      reelsRef
        .orderBy("num_upvotes", "desc")
        .where("weekstamp", "==", getWeekstamp(moment()))
        .orderBy("timestamp", "desc")
        .limit(numDisplayed)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data_ = doc.data();
            data_["id"] = doc.id;
            reelList_.push(data_);
          });
          res.status(200);
          res.json({
            data: reelList_
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      reelsRef
        .orderBy("upvotes", "desc")
        // .where("daystamp", "==", getDaystamp(moment()))
        // .orderBy("timestamp", "desc")
        .limit(numDisplayed)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let data_ = doc.data();
            data_["id"] = doc.id;
            reelList_.push(data_);
          });
          res.status(200);
          res.json({
            data: reelList_
          });
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
};

const getDaystamp = (moment_) => {
    // get unix days since jan 1st 1970
    return Math.floor(moment_.unix().valueOf() / 86400);
};
  
const getWeekstamp = (moment_) => {
    // get unix weeks since dec 29 monday 1969
    return Math.floor((Math.floor(moment_.unix().valueOf() / 86400) - 4) / 7);
};

  export { getLeaderBoard }