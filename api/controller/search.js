import { firebase } from "../../firebase/config.js";

const search = async (req, res) => {
    const searchTerm = req.body.searchTerm;
    var profiles = [];
    var reels = [];
    if(searchTerm.length <= 1) {
        return;
    }
    if(searchTerm[0] == "@") {
        // setReelList([]);
        profiles = await getProfiles(searchTerm.slice(1));
        res.json({
            data : profiles
        });
        return;
    }
    if(searchTerm[0] == "#") {
        // setProfileList([]);
        reels = getReels(searchTerm.slice(1));
        res.json({
            data : reels
        });
        return;
    }
    profiles = await getProfiles(searchTerm);
    console.log(profiles);
    // res.json({
    //     data : profiles
    // });
    reels = await getReels(searchTerm);
    // res.status(200);
    res.json({
       data : [...profiles, ...reels]
    }); 
};

const getReels = async (searchTerm) => {
    let reelsRef = firebase.firestore().collection("reels");
    let reelList_ = [];
    console.log("getting reels");
    await reelsRef
    //   .orderBy("num_upvotes", "desc")
      .where("tags", "array-contains", searchTerm)
    //   .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          reelList_.push(data_);
            console.log(data_.id);
        });
        // setReelList(reelList_);
      })
      .catch((error) => {
        console.log(error.message);
      });
      return reelList_;
};

const getProfiles = async (searchTerm) => {
    let usersRef = firebase.firestore().collection("users");
    let userList = [];
    console.log("getting profiles " + searchTerm);
    await usersRef
      .where("fullName", "==", searchTerm)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let data_ = doc.data();
          data_["id"] = doc.id;
          userList.push(data_);
            console.log(doc.id);
        });
        // console.log(userList);
        // setProfileList(userList);
      })
      .catch((error) => {
        console.log(error.message);
      });
    return userList;
};

export { search };