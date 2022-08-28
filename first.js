const express = require("express");
const session = require("express-session");
const multer = require("multer");
const data = require("./second");
const passport = require("passport");
const passportLocal = require("passport-local");

const app = express();

const LocalStrategy = new passportLocal.Strategy({
    usernameField: "email",
},(email, password, done) =>{
    const user = data.users.find((user) => user.email === email);
    if(!user){
        return done(null, false)
        }
        else{
        if(user.password !== password){
            return done(null, false)
            }
            else{
                return done(null, user.email)
        }
    }
     
});

passport.use(LocalStrategy);

app.set("views", "views/");
app.set(`view engine`, `ejs`);

// const storage = multer.diskStorage({
//     destination: "./uploads",
//     filename:(req,file,calback)=>{
//         calback(null,file.originalname);
//     },
// });

// const upload = multer({storage});

app.use(
  session({
    secret: "kihjghhhbunmi",
    cookie:{
      maxAge: 60*60*1000,
      httpOnly: false,
      secure: false,
    },
    saveUninitialized:true,
    resave:false,
  })
);

app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({extended:true}));

app.get('/', (req,res) => {

    if(!req.session.visitCount){
        req.session.visitCount = 1;
    }

    else{
        req.session.visitCount = req.session.visitCount + 1;
    }
    console.log(req.session);
    res.render("index", {
        count: req.session.visitCount,
    });
    // res.sendFile(path.resolve(__dirname, "login.html"));
});

app.get('/login', (req,res) => {
res.render("login");
});

app.post('/login',passport.authenticate("local",{ failureRedirect: "/login", successRedirect: "/",}), (req,res)=>{
//     const {email, password} = req.body;
//     console.log(email, password);
//     // res.sendFile(path.resolve(__dirname, "login.html"));

//     const user = data.users.find((user) => user.email === email);
//     if(!user){
//         res.status(404).send({
//             message: "User not found",
//         });
//     }

//     else{
//         if(user.password !== password){
//             res.status(404).send({
//                 message: "Password is incorrect",
//             });
//         }

//         else{
//             res.redirect("/")
//         }

//     }
});

// app.post("/login",upload.single("avatar"), (req,res)=>{
//     console.log(req.file);
//     res.send("message");
// });

const port = 3000;
app.listen(port, () => {
    console.log(
        `Server started ${port} visit: http://localhost:${port}`
    );
});














