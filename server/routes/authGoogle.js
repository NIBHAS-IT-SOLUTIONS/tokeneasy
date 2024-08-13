const router = require("express").Router();
const passport = require("passport");

// router.get("/login/success", (req, res) => {
// 	if (req.user) {
// 		res.status(200).json({
// 			error: false,
// 			message: "Successfully Loged In",
// 			user: req.user,
// 		});
// 	} else {
// 		res.status(403).json({ error: true, message: "Not Authorized" });
// 	}
// });

// router.get("/login/failed", (req, res) => {
// 	res.status(401).json({
// 		error: true,
// 		message: "Log in failure",
// 	});
// });

// router.get("/google", passport.authenticate("google", ["profile", "email"]));

// router.get(
// 	"/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: process.env.CLIENT_URL,
// 		failureRedirect: "/login/failed",
// 	})
// );

// router.get("/logout", (req, res) => {
// 	req.logout();
// 	res.redirect(process.env.CLIENT_URL);
// });

router.get('/auth/google',
	passport.authenticate('google', { scope: ['profile'] }));
  
  router.get('/auth/google/callback', 
	passport.authenticate('google', { failureRedirect: ()=>{res.json({message:"failed"})} }),
	function(req, res) {
	  // Successful authentication , redirect home.
	  res.json({message:"success"});
	});

module.exports = router;
