const express 			= require("express"),
		app 			= express(),
		bodyParser		= require("body-parser"),
		mongoose		= require("mongoose"),
		passport		= require("passport"),
		methodOverride	= require("method-override"),
		flash			= require("connect-flash"),
		LocalStrategy	= require("passport-local"),
		Campground		= require("./models/campground"),
		Comment			= require("./models/comment"),
		User			= require("./models/user"),
		seedDB 			= require("./seeds");

//requiring routes
const commentRoutes		 = require("./routes/comments"),
		campgroundRoutes = require("./routes/campgrounds"),
		authRoutes		 = require("./routes/index");

const port 				 = process.env.PORT || 3000,
	  args 				 = process.argv.slice(2),
	  secret_default 	 = "the worlds longest secret to ever become a secret",
	  secret_session 	 = process.env.EXPRESSSECRET || secret_default,
	  url				 = process.env.DATABASEURL || "mongodb://localhost/express_camp";

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true
}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
app.use(express.static(__dirname + "/public"));

args.forEach(function (elem) {
	if (elem === "--seed") {
		console.log("Database will be cleared, then seeded!");
		seedDB();
	} else {
		console.log(`unknown argument "${elem}" has been ignored.`);
	}
});

if (secret_session === secret_default) { 
	console.log("WARN: Secret left as default!");
}

//PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: secret_session,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
	//This function seems to need to be below passport.serializeUser(User.serializeUser());
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use("/", authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

app.listen(port, function () {
	console.log(`Server listening on port ${port}`);
});