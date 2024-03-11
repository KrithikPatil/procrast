import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
 // Import should match the filename*/
import Userdb from './model/userSchema.js';
const clientid = '402500723085-n0c7rl7g4tdlp09gh943iohu7p1nokc9.apps.googleusercontent.com'
const clientsecret = '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'

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors(
    {
        origin: 'http://localhost:3000',
        methods: 'GET,POST,PUT,DELETE',
        credentials: true
    }
));
const CONNECTION_URL = 'mongodb+srv://Ayush:Ayush123@cluster0.mm5itwq.mongodb.net/Procrast'
const PORT = 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('Database connected')))
    .catch((error) => console.log(error.message));

app.use(express.json());

app.use(session({
    secret: 'uiwdhiu3wgbfi3l29pr3ifhoq',
    resave: false,
    saveUninitialized: true
}));

app.post('/user/insert', async (req, res) => {
    const { displayName, email, password } = req.body;
    const data = {
        displayName: displayName,
        email: email,
        password: password
    }
    try {
        const check = await Userdb.findOne({ email: email });
        if (check) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }
        
        // Insert the new user into the database
        await Userdb.create(data);
        
        console.log("User inserted successfully");
        return res.status(201).json({ message: "User inserted successfully" });
    }
    catch (error) {
        console.error("Error inserting user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
})



app.use(passport.initialize());
app.use(passport.session());

passport.use(
    new GoogleStrategy(
        {
            clientID: clientid,
            clientSecret: clientsecret,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile)
            try {
                // Check if the user already exists in your database
                let existingUser = await Userdb.findOne({ emailid: profile.email});

                if (existingUser) {
                    // If the user already exists, return the user
                    done(null, existingUser);
                } else {
                    // If the user doesn't exist, create a new user
                    const newUser = new Userdb({
                        
                        displayName: profile.displayName,
                        email: profile.emails[0].value,
                        
                        // Add other relevant fields as needed
                    });

                    // Save the new user to the database
                    await Userdb.insertMany([newUser]);
            
                }
            } catch (error) {
                done(error, null);
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3000/capture",
    failureRedirect: "http://localhost:3000/signin"
}));
 app.post("../")

// app.listen(8000 ,() => {
//     console.log('port connected');
// })


//app.get('/', (req, res) =>{
//  res.status(200).json('server started')
//});

export default app;
