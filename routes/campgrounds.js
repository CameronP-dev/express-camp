const express		= require("express"),
	  router		= express.Router(),
	  middleware	= require("../middleware"),
	  Campground	= require("../models/campground"),
	  Comment		= require("../models/comment");

//INDEX - displays all the campgrounds
router.get("/", function (req, res) {
	
	Campground.find(function (error, campgrounds) {
		if (error) {
			console.log(err);
		} else {
			res.render("campgrounds/index", {campgrounds: campgrounds});
		}
	});
});

//NEW - show form to create new campground (needs to go before /campgrounds/:id)
router.get("/new", middleware.isLoggedIn, function (req, res) {
	res.render("campgrounds/new");
});

//SHOW - shows more info about one campground
router.get("/:id", function (req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function (err, result) {
		if (err) {
			console.log(err);
		} else {
			res.render("campgrounds/show", {campground:result});
		}
	});
});

//CREATE - add new campground to DB
router.post("/", middleware.isLoggedIn, function (req, res) {
	let name = req.body.name;
	let price = req.body.price;
	let image = req.body.image;
	let description = req.body.description;
	let author = {
		id: req.user._id,
		username: req.user.username
	}
	//push new campground
	Campground.create({
		name: name,
		price: price,
		image: image,
		description: description,
		author: author
	}, function (err, campground) {
		if (err) {
			console.log(err);
		} else {
			req.flash("success", "Campground added");
			res.redirect("/campgrounds");
		}
	});
});

//edit form for campground
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findById(req.params.id, function (err, campground) {
		res.render("campgrounds/edit", {campground: campground});
	});
});

//update campground
router.put("/:id/", middleware.checkCampgroundOwnership, function (req, res) {
	//find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			//redirect to campground show page
			res.redirect("/campgrounds/" + req.params.id);
		}
	});
});

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
	Campground.findByIdAndRemove(req.params.id, function (err, removedCampground) {
		if (err) {
			console.log(err);
			res.redirect("/campgrounds");
		} else {
			Comment.deleteMany({_id: {$in: removedCampground.comments}}, function (err) {
				if (err) {
					console.log(err);
				}
			});
			//Unlike other redirects, I think this one can be considered independent of the 
			//results from the preceding database interaction
			req.flash("success", "Campground deleted");
			res.redirect("/campgrounds");
		}
	});
});

module.exports = router;