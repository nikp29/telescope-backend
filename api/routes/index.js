import express from "express";

import { getReelList, getExpList, getInfo } from "../controller/profile.js";
import { addNewExp, deleteExp } from "../controller/editExperience.js";
import { uploadReel, confirmUpload, reelVote } from "../controller/reel.js";
import { editInfo } from "../controller/editProfile.js";
import { search } from "../controller/search.js"
import { getExploreReels } from "../controller/explore.js";
import { getLeaderBoard } from "../controller/leaderBoard.js";
import { uploadDiscussion, getDiscussions, discussionVote } from "../controller/discussion.js";
import { discussionComments, reelComments } from "../controller/comments.js";
import { signin, signup } from "../controller/authentication.js";

var router = express.Router();



router.get('/profile/reels', getReelList);
router.get('/profile/info', getInfo);
router.get('/profile/experience', getExpList);

router.get('/explore', getExploreReels);
router.get('/leaderboard', getLeaderBoard);
router.get('/search', search);

router.get('/reels/upload', uploadReel);
router.get('/reels/comments', reelComments);

router.get('/discussions', getDiscussions);
router.get('/discussions/comments', discussionComments);


router.post('/discussions/new', uploadDiscussion);
router.post('/profile/experience/add', addNewExp);
router.post('/reels/upload', confirmUpload);

router.post('/signup', signup);
router.post('/signin', signin);
// router.post('/signout',);

router.put('/reels/editvote', reelVote);
router.put('/discussions/editvote', discussionVote);
router.put('/profile/experience/delete', deleteExp);
router.put('/profile/edit', editInfo);


export default router;