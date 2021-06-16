import { firebase } from "../../firebase/config.js";

const signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const data = {
        id: uid,
        email,
        fullName,
        bio: "",
        pic: false,
        youtube: "",
        instagram: "",
        tiktok: "",
      };
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .set(data)
        .then(() => {
        console.log(data);
        res.status(200).json({
            "data" : data
        });
        })
        .catch((error) => {
            console.log(error.message);
            res.status(400).json({
                "data" : error.message
            });
        });
    })
    .catch((error) => {
        console.log(error.message);
        res.status(400).json({
            "data" : error.message
        })
    });
};

// const signin = (dispatch) => async ({ email, password }) => {
const signin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      const uid = response.user.uid;
      const usersRef = firebase.firestore().collection("users");
      usersRef
        .doc(uid)
        .get()
        .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
                res.status(404).json({
                    "data" : "User does not exist"
                });
                return;
            }
            const data = firestoreDocument.data();
            res.status(200).json({
                "data" : data
            });
        })
        .catch((error) => {
            res.status(400).json({
                "data" : error.message
            });
        });
    })
    .catch((error) => {
        res.status(400).json({
            "data" : error.message
        });
    });
};


export { signup, signin };