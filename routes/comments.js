const express		= require("express"),
	  router		= express.Router({mergeParams: true}),
	  middleware	= require("../middleware"),
	  Campground	= require("../models/campground"),
	  Comment		= require("../models/comment");
//======================
//COMMENTs ROUTES
//======================

//comments news
router.get("/new", middleware.isLoggedIn, function(req, res){
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			console.log(err);
		} else {
			res.render("comments/new", {campground:campground});
		}
	});
});

//create
router.post("/", middleware.isLoggedIn, function(req, res){
	//Look up campground
	Campground.findById(req.params.id, function(err, campground){
		if(err){
			req.flash("error", "Campground not found");
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//create new comments
			Comment.create(req.body.comment, function(err, comment){
				if(err){
					console.log(err);
				} else {
					//add username and id to comment
					comment.author.id = req.user._id
					comment.author.username = req.user.username;
					//connect new comment to campground
					comment.save();
					campground.comments.push(comment);
					campground.save();
					//redirect to campground show page
					req.flash("success", "Comment added")
					res.redirect("/campgrounds/" + campground._id);
				}
			});
		}
	});
});

//COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, comment){
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.render("comments/edit", {campground_id: req.params.id, comment: comment});
		}
	});
});

//COMMENT UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			console.log(err);
			res.redirect("back");
		} else {
			req.flash("success", "Comment deleted")
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

module.exports = router;