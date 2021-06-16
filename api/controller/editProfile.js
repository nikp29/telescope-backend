import { firebase } from "../../firebase/config.js";

// const editInfo = async (name, bio, f, t, i) => {
const editInfo = async (req,res) => {
    // const uid = await AsyncStorage.getItem("token");
    const name = req.body.name;
    const uid = req.body.uid;
    const bio = req.body.bio;
    const f = req.body.facebook;
    const t = req.body.tiktok;
    const i = req.body.instagram;

    // const userRef = firebase.firestore().collection("users");
    const userDoc = firebase.firestore().collection("users").doc(uid);
    if (bio)
        await userDoc
        .update({
            bio: bio,
        })
        .catch((error) => {
            console.error("Error editing document: ", error);
        });
    if (name){
        console.log("changing name");
        await userDoc
        .update({
            fullName: name,
        })
        .catch((error) => {
            console.error("Error editing document: ", error);
    });
    }
    if (f)
      await userDoc
        .update({
            youtube: f,
        })
        .catch((error) => {
            console.error("Error editing document: ", error);
        });
    if (t)
      await userDoc
        .update({
            tiktok: t,
        })
        .catch((error) => {
            console.error("Error editing document: ", error);
     });
    if (i)
        await userDoc
        .update({
          instagram: i,
        })
        .catch((error) => {
          console.error("Error editing document: ", error);
    });
    res.status(200);
    res.json({
        "data" : "updated"
    });
    return;
};

export { editInfo };