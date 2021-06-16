import { firebase } from "../../firebase/config.js";
import youtubeApi from "../../youtube/youtube.js";
import moment from "moment";


// const confirmUpload = async () => {
const confirmUpload = async (req, res) => {
    const reelsRef = firebase.firestore().collection("reels");
    const usersRef = firebase.firestore().collection("users");

    // const uid = await AsyncStorage.getItem("token");
    const uid = req.body.uid; //change to token
    const tags = req.body.tags;
    const thumbnail = req.body.thumbnail;
    const description = req.body.description;
    const url = req.body.url;

    await usersRef.doc(uid).update({ lastUploaded: moment().unix().valueOf() });
    await reelsRef.add({
        timestamp: moment().unix().valueOf(),
        daystamp: getDaystamp(moment()),
        weekstamp: getWeekstamp(moment()),
        youtube_id: url,
        tags,
        user: uid,
        thumbnail,
        upvotes: [],
        comments: [],
        description,
        num_upvotes: 0,
    })
    .catch((error) => {
        res.status(404);
        res.json({
            "error" : error.message
        });
    });
    // props.navigation.goBack(null);
    // navigate("Today");
    res.status(200);
    res.json({
        "data" : "uploaded"
    });
};




const uploadReel = async(req, res) => {
    // hi jared
    // const uid = await AsyncStorage.getItem("token");
    const uid = req.body.uid; //change to token
    var urlRaw = req.body.url;
    const tags = req.body.tags;
    const description = req.body.description;

    const youtubeRegex = /(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'<> #]+)/;
    if (youtubeRegex.test(urlRaw)) {
        if (description.length >= 0) {

            const matches = tags;
            // ? tags.match(/#(\w+)/g).map((item) => {
            //         return item.substr(1);
            //     })
            //     : [];

            const url = youtubeRegex.exec(urlRaw)[1];
            const usersRef = firebase.firestore().collection("users");
            await usersRef
            .doc(uid)
            .get()
            .then(async (firestoreDocument) => {
                if (!firestoreDocument.exists) {
                    res.status(404);
                    res.json({
                        "error": "Error getting user information"
                    });
                    return;
                }
                const data = firestoreDocument.data();
                if (data.hasOwnProperty("lastUploaded")) {
                  // convert unix timestamp to moment
                    const lastUploaded = data.lastUploaded;
                    const current = moment().subtract(0, "d").unix().valueOf(); // limit 1 upload per day
                    if (current > lastUploaded) {
                        const response = await youtubeApi.get("/videos", {
                            params: { id: url },
                        });
                        if (response && response.data.items[0]) {
                            const thumbnail =
                                response.data.items[0].snippet.thumbnails.standard.url;
                            res.status(200);
                            res.json({
                                "url": url,
                                "tags": matches,
                                "thumbnail": thumbnail,
                                "description": description,
                                "username": data.fullName,
                                "uid": uid 
                            });
                        } else {
                            res.status(404);
                            res.json({
                                "error": "invalid youtube video"
                            });
                        }
                    } else {
                        res.status(404);
                        res.json({
                            "error": "You must wait 24 hours since your last post before posting a new reel"
                        });
                    }
                } else {
                    const response = await youtubeApi.get("/videos", {
                        params: { id: url },
                    });
                    if (response && response.data.items[0]) {
                        const thumbnail =
                            response.data.items[0].snippet.thumbnails.standard.url;
                        res.status(200);
                        res.json({
                           "url": url,
                           "tags": tags,
                           "thumbnail": thumbnail,
                           "description": description,
                           "username": data.fullName,
                           "uid": uid 
                        });
                    } else {
                        res.status(404);
                        res.json({
                            "error": "invalid youtube video2"
                        });
                    }
                }
            })
            .catch((error) => {
                res.status(404);
                res.json({
                    "error": error.message
                });
            });
        } else {
            res.status(404);
            res.json({
                "error": "Description must be between 2 and 40 characters"
            });
        }
    } else {
        res.status(404);
        res.json({
            "error": "Invalid youtube url"
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

export { uploadReel, confirmUpload };