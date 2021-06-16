import { firebase } from "../../firebase/config.js";

const getReelList = (req, res) => {
    const uid = req.query.uid;
    const reelsRef = firebase.firestore().collection("reels");
    let reelList_ = [];
    let reel_id = "";
    reelsRef
      .where("user", "==", uid)
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          reelList_.push(data_);
        });
        res.status(200);
        res.json(reelList_);
      });
};

const getExpList = (req, res) => {
    const uid = req.query.uid;
    console.log("getting exp");
    const expRef = firebase
      .firestore()
      .collection("users")
      .doc(uid)
      .collection("experiences");
    let expList_ = [];
    let reel_id = "";
    expRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let data_ = doc.data();
        data_["id"] = doc.id;
        console.log("exp doc id " + doc.id);
        expList_.push(data_);
      });
      res.status(200);
      res.json(expList_);
    });
};

const getInfo = (req, res) => {
    const uid = req.query.uid;
    var imageURL = false;
    const userRef = firebase.firestore().collection("users");
    // var storageRef = firebase.storage().ref();
    var data = {
        bio: "",
        fullName: "",
        email: "",
        youtube: "",
        tiktok: "",
        instagram: "",
        pic: false
    }
    userRef
    .doc(uid)
    .get()
    .then((doc) => {
        data.bio = doc.data().bio;
        data.fullName = doc.data().fullName;
        data.email = doc.data().email;
        data.youtube = doc.data().youtube;
        data.tiktok = doc.data().tiktok;
        data.instagram = doc.data().instagram;
        data.imageURL = doc.data().pic;
        imageURL = doc.data().pic;
    })
    // .then(() => {
    //   if (imageURL) {
    //     data.pic = 
    //     storageRef
    //       .child("profile_pictures/" + uid + ".jpg")
    //       .getDownloadURL()
    //       .then((url) => {
    //         data.pic = url;
    //     });
    //   }
    // })
    .then(() => {
        res.status(200);
        res.json(data);
    })
    .catch((error) => {
        res.status(404);
        res.json(error);
    });
};

export { getReelList, getExpList, getInfo };