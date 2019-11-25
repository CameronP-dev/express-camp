const Campground	= require("../models/campground"),
	  Comment		= require("../models/comment");

//all the middleware goes here
const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash("error", "Please Login First");
	res.redirect("/login");
};

middlewareObj.checkCampgroundOwnership = function (req, res, next) {
	//is user is logged in?
	if (req.isAuthenticated()) {
		Campground.findById(req.params.id, function (err, campground) {
			if (err) {
				req.flash("error", "Campground not found");
				console.log(err);
				res.redirect("back");
			} else {
				//does user own campground?
				if (campground.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please Login First");
		res.redirect("back");
	}
};

middlewareObj.checkCommentOwnership = function (req, res, next) {
	//is user is logged in?
	if (req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function (err, comment) {
			if (err) {
				req.flash("error", "Comment not found");
				console.log(err);
				res.redirect("back");
			} else {
				//does user own comment?
				if (comment.author.id.equals(req.user._id)) {
					return next();
				} else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "Please Login First");
		res.redirect("back");
	}
};

module.exports = middlewareObj;