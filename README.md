# telescope-backend
Profile:
Reels List
Method: GET
url: /api/profile/reels?uid=UID

Experience List
Method: GET
url: /api/profile/experience?uid=UID

Profile Info
Method: GET
url: /api/profile/info?uid=UID

Edit Profile Info
Method: PUT
url: /api/profile/edit
data: {
	name : “NAME”,
	uid : “UID”,
	bio : “BIO”,
	facebook : “FACEBOOK”,
	tiktok : “TIKTOK”,
	instagram : “INSTAGRAM”
}

Add Experience
Method: POST
url: /api/profile/experience/add
data : { 
	uid: “UID”, //remove
	newTitle: “TITLE”,
	newDescription: “DESCRIPTION”
}

Delete Experience
Method: POST
url: /api/profile/experience/delete
data : { 
	uid: “UID”, //remove
	expId: “EXPID”
}

Reels:
Upload Reel (get data for upload)
Method: GET
Url: /api/reels/upload
data: {
uid : “UID”, //remove
description : "DESCRIPTION",   
url : "URL",
tags : “TAGS”

}

Confirm Upload
Method: POST
url: /api/reels/upload
data : {
	uid : “UID”,  //remove
	tags : [TAGS],
	thumbnail : “THUMBNAIL URL”,
	description : “DESCRIPTION”,
	url : “URL”
}

Comments
Method: GET
url: /api/reels/comments
data: {
	id = “REELID”
}

Edit Vote
Method: PUT
url: /api/discussions/editvote
data  : {
	uid : “UID”,
	upvotes : [UPVOTES],
	reelId : “REELID”
}

Authentication:
Signin
Method: POST
url: /api/signin
data : {
	email : “EMAIL”,
	password : “PASSWORD”,
	fullName: “FULL NAME”
}

Signup
Method: POST
url: /api/signup
data : {
	email : “EMAIL”,
	password : “PASSWORD”
}

Explore:
Method: GET
url: /api/explore //fix timestamp stuff

Leaderboard:
Method: GET
url: /api/leaderboard //fix timestamp stuff and isweek

Discussions:
Discussion Feed
Method: GET
url: /api/discussions

Upload Discussion
Method: POST
url: /api/discussions/new
data : {
	uid : “UID” //remove
	title : “TITLE,
	description : “DESCRIPTION”
}

Comments
Method: GET
url: /api/discussions/comments
data: {
	id = “DISCUSSIONID”
}

Edit Vote
Method: PUT
url: /api/discussions/editvote
data  : {
	uid : “UID”,
	upvotes : [UPVOTES],
	discussionId : “DISCUSSIONID”
}

Search:
Method: GET
url: /api/search
data : {
	searchTerm: “SEARCH TERM”
}



