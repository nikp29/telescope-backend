import { firebase } from "../../firebase/config.js";

// const addNewExp = async (newTitle, newDescription, setExpList, expList) => {
const addNewExp = (req, res) => {
    const newTitle = req.body.newTitle;
    const newDescription = req.body.newDescription;
    const uid = req.body.uid; //change to token
    if(newTitle == "" || !newTitle) {
        return;
    }
    // const uid = await AsyncStorage.getItem("token");
    const expRef = firebase.firestore().collection("users").doc(uid).collection("experiences");
    expRef.add({
        title: newTitle,
        description: newDescription
    })
    .then((docRef) => {
        console.log('exp id is ' + docRef.id);
        let data_ = {
        title: newTitle,
        description: newDescription
    };
        data_["id"] = docRef.id;
        res.status(200);
        res.json(data_);
    })
    .catch((error) => {
        res.status(404);
        res.json(error);
        console.error("Error adding document: ", error);
    });
}
  
// const deleteExp = async (expId, setExpList, expList) => {
const deleteExp = (req, res) => {
    const expId = req.body.expId;
    const uid = req.body.uid; //change to token
    // const uid = await AsyncStorage.getItem("token");
    const expRef = firebase.firestore().collection("users").doc(uid).collection("experiences");
    expRef.doc(expId).delete().then(() => {
    res.status(200);
    // res.json({"expList" : expList});
    res.json({"data" : "success"});
    })
    .catch((error) => {
        res.status(404);
        res.json(error);
        console.error("Error removing document: ", error);
    });
}

export { addNewExp, deleteExp };