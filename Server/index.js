import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
 // Import should match the filename*/
import Userdb from './model/userSchema.js';
import dotenv from 'dotenv';
import Event from './model/Event.js';
import moment from 'moment';
dotenv.config();

const accessEnv = {
    clientid: process.env.CLIENT_ID,
    clientsecret: process.env.CLIENT_SECRET
}

const app = express();
const CONNECTION_URL = 'mongodb+srv://Ayush:Ayush123@cluster0.mm5itwq.mongodb.net/Procrast'
const PORT = 5000

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log('Database connected')))
    .catch((error) => console.log(error.message));

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
// app.use(cors(
//     {
//         origin: 'http://localhost:3000',
//         methods: 'GET,POST,PUT,DELETE',
//         credentials: true
//     }
// ));
app.use(cors());

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
            return res.json({ message: "exists" });
        }
        
        // Insert the new user into the database
        await Userdb.create(data);
        
        console.log("User inserted successfully");
        return res.json({ message: "User inserted successfully" });
    }
    catch (error) {
        console.error("Error inserting user:", error);
        return res.json({ message: "Internal server error" });
    }
});

app.post('/user/fetch', async (req, res) => {
    const { email, password } = req.body;
    const data = {
        email: email,
        password: password
    }
    try {
        const check = await Userdb.findOne({ email: email });
        if (check) {
            if (check.password == password) {
                return res.json({ message : check.displayName });
            }
            else {
                return res.json({ message : "wrong password" });
            }
        }
        else {
            return res.json({ message : "no user" });
        }
    }
    catch (error) {
        console.error("Error fetching user:", error);
        return res.json({ message: "Internal server error" });
    }
});

app.post('/create-event', async(req, res) => {
    try {
        const email = req.query.email;
        // console.log(email);
        const eventData = {email: email, ...req.body, completed: false, todo: true};
        const event = new Event(eventData); 
        await event.save();
        res.sendStatus(201);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Failed to create event' });
    }
});

app.post('/get-event', async(req, res) => {
    const { email } = req.body;
    try {
        // const events = await Event.find({
        //     start: { $gte: moment(req.query.start).toDate() },
        //     end: { $lte: moment(req.query.end).toDate() }
        // });
        const events = await Event.find({ email: email });
        // const events = await Event.find();
        res.send(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Failed to fetch events' });
    }
});

app.post('/fetchTasks', async(req, res) => {
    const { email } = req.body;
    try {
        const events = await Event.find({
            $and: [
                { email: email },
                { start: { $lte: new Date() } },
                { end: { $gte: new Date() } }
            ]
        })
        res.send(events);
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/addTask", async (req, res) => {
    const { email, title } = req.body;
    const currentDate = new Date();
    
    currentDate.setHours(0, 0, 0, 0);
    
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const data = {
        email: email,
        start: new Date(),
        end: nextDay,
        title: title,
        completed: false,
        todo: true
    }
    try {
        await Event.create(data);
        res.send("success");
    }
    catch (e) {
        console.log("There was error inserting the task through todo");
        console.log(e);
    }
});

app.post("/markDone", async (req, res) => {
    const { email, i } = req.body;
    console.log(email, i);
    try {
        const result = await Event.updateOne(
            { email: email, title: i },
            { $set: { completed: true, todo: false } }
        );
        if (result.nModified === 1) {
            res.send("success");
        } else {
            res.send("No matching document found to update");
        }
    }
    catch (e) {
        console.log(e);
    }
});

app.post("/markUndone", async (req, res) => {
    const { email, i } = req.body;
    console.log(email, i);
    try {
        const result = await Event.updateOne(
            { email: email, title: i },
            { $set: { completed: false, todo: true } }
        );
        if (result.nModified === 1) {
            res.send("success");
        } else {
            res.send("No matching document found to update");
        }
    }
    catch (e) {
        console.log(e);
    }
});

app.use(passport.initialize());
app.use(passport.session());

let displayName;
let email;

passport.use(
    new GoogleStrategy(
        {
            clientID: accessEnv.clientid,
            clientSecret: accessEnv.clientsecret,
            callbackURL: "http://localhost:5000/auth/google/callback",
            scope: ["profile", "email"]
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("profile", profile)
            displayName = profile.name.givenName;
            email = profile.emails[0].value;
            try {
                // Check if the user already exists in your database
                let existingUser = await Userdb.findOne({ emailid: profile.email});

                if (existingUser) {
                    // If the user already exists, return the user
                    done(null, existingUser);
                } else {
                    // If the user doesn't exist, create a new user
                    const newUser = new Userdb({
                        
                        displayName: profile.name.givenName,
                        email: profile.emails[0].value,
                        password: ''
                        
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
app.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    // Extract user profile from request object
    const userProfile = req.user;

    // Send user profile data as JSON response to React frontend
    res.json({ user: userProfile });
});

app.get("/auth/google/callback", passport.authenticate("google", {
    successRedirect: `http://localhost:3000/capture?email=${email}&displayName=${displayName}`,
    failureRedirect: "http://localhost:3000/signin"
}));
// app.post("../")

// app.listen(8000 ,() => {
//     console.log('port connected');
// })


//app.get('/', (req, res) =>{
//  res.status(200).json('server started')
//});

export default app;
