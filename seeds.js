const mongoose		= require("mongoose"),
		Campground	= require("./models/campground"),
		Comment		= require("./models/comment");

var data = [
	{
		name: "Salmon Creek",
		price: "9.99",
		image: "https://aowanders.com/wp-content/uploads/2017/09/BEAR-CREEK-FREE-CAMPING-CAMPSITE-1200x801.jpg",
		description: "Named after Edward Salmon, who swam up the creek on a bet and later did so again when a doubter said it was impossible. The site has: No bathroom. No water. Beautiful salmon!",
		author: {
			id: "588c2e092403d111454fff76",
			username: "Testificate"
		}
	},
	{
		name: "Granite Hill",
		price: "9.99",
		image: "https://img.hipcamp.com/image/upload/c_fill,f_auto,g_auto,h_960,q_60,w_1440/v1498440482/campground-photos/lpqba9a2xlku5tjgxvwm.jpg",
		description: "This is a huge granite hill. The site has: No bathroom. No water. Beautiful granite!",
		author: {
			id: "588c2e092403d111454fff76",
			username: "Testificate"
		}
	},
	{
		name: "Sky Palace",
		price: "14.99",
		image: "http://images.amcnetworks.com/ifccenter.com/wp-content/uploads/2011/12/CASTLEINTHESKY_Photo_03.jpg",
		description: "A massive fortress of camping. The site has: 250 bathrooms. 125 potable water locations. Beautiful sky!",
		author: {
			id: "588c2e092403d111454fff76",
			username: "Testificate"
		}
	}];
     
function seedDB() {
	//Remove all campgrounds
	Campground.deleteMany({}, function (err) {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.deleteMany({}, function (err) {
            if (err) {
                console.log(err);
            }
            console.log("removed comments!");
            //add a few campgrounds
            data.forEach(function (seed) {
                Campground.create(seed, function(err, campground){
                    if (err) {
                        console.log(err)
                    } else {
						console.log("added a campground");
                        //create a comment
						Comment.create(
                            {
                                text: "This place is great, but I wish there was internet",
                                author: {
									id: "588c2e092403d111454fff71",
									username: "Homer"	
								}
                            }, function (err, comment) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
}

module.exports = seedDB;