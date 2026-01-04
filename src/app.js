const express = require("express");

const {connectDB} = require("./config/database")

const UserModel = require("./models/user")

const { adminAuth } = require("./middlewares/auth")

const app = express();
app.use(express.json());

// ! routes order matter a lot
// app.use('/test', (req, res) => {
//     res.send("Hello from test")
// })

// app.use('/api', (req, res) => {
//     res.send("Hello from api")
// });

// * This will match all the HTTP Method(get, oost, put etc.) API calls to /hello
app.use('/hello', (req, res) => {
    res.send("Hello Hello hello");
});

// app.use('/', (req, res) => {
//     res.send("Hello from /")
// })

// * This will specifically match only the GET HTTP Method API calls to /user 
app.get('/user', (req, res) => {
    res.send({
        "firstName" : "Anmol",
        "lastName" : "Sharma"
    })
})

// POST API Call
app.post('/user', (req, res) => {
    res.send("Data successfully saved to the DB")
})

// DELETE API Call
app.delete('/user', (req, res) => {
    res.send("User deleted successfully")
})


// ! Advanced routing
// app.get('/ab?c', (req, res) => {
//     res.send("It means the 'b' in the route handler is optional which means if we make a call like 'ac' it will also work");
// });

// app.get('/ab+c', (req, res) => {
//     res.send("It means we can write anything after 'b' while making the call but it should always end with 'c' eg.- '/ab dfveruveue c' ");
// });

// app.get('/ab*cd', (req, res) => {
//     res.send("It means we can add anything between ab and cd like abANMOLcd, the call will work")
// })

// app.get('/a(bc)+d', (req, res) => {
//     res.send("It means we can also group these also")
// })

// app.get(/a/, (req, res) => {
//     res.send("This is regex which means if anywhere in the url 'a' appears it will work")
// })

// app.get(/.*fly$/, (req, res) => {
//     res.send("This is a complex regex it means if anything ends with a 'fly' it will work")
// })


// ! How to get query params
// * http:localhost:3000/user?userID=5&pwd="testing"
app.get('/user', (req, res) => {
    console.log(req.query) // will get the {userID : '5', pwd : 'testing} from the query
    res.send("User")
})

// ! How to get dynamic apis - PARAMS
// * http:localhost:3000/user
app.get('/user/:userID/:name/:password', (req, res) => {
    console.log(req.params)
    res.send("User")
})


// ! Multiple route Handlers
app.use('/users',
    (req, res, next) => {
        
        console.log("rh1")
        // res.send("rh1")
        next();
        
    },
    (req, res) => {
        console.log("rh2")
        res.send("rh2")
    }
)





// ! Handle Auth Middleware for all requests(GET, POST, PUT etc.)
// app.use('/admin', (req, res, next) => {
//     const token = "xyz";
//     const isAuth = (token === 'xyz');

//     if (!isAuth) res.status(401).send("Unauthorized")
//     else next();
// })

app.get('/admin/getAllData', adminAuth, (req, res) => {
    console.log("getting all data");
    res.send("Get all data")
})

app.get('/admin/deleteUser', (req, res) => {
    res.send("Deleted a User")
})



// ! sign-up
app.post("/signup", async (req, res) => {
    // dummy data
    
    const userObj = new UserModel(
        // {
        // firstName : "ANmol",
        // lastName : "Sharma",
        // email: "anmol@gmail.com",
        // password : "Anmol123"
        // }
        req.body
    );
    
    //  creating a new instance of the UserModel model
    const user = new UserModel(userObj)

    //  saving the userObj in the database
    await user.save();

    res.send("User added successfully")
});

app.get("/userGet", async(req, res) => {
    const userEmail = req.body.emailID;

    try {
        const user = await UserModel.find({email: userEmail});
        if (user.length == 0) {
            res.status(400)
               .send("No users")
        }
        else {
            res.send(user)
        }
        
    }
    catch(err){
        res.status(401)
           .send("Something went wrong")
    }

})


app.get("/feed", async(req, res) => {


    try {
        const users = await UserModel.find({});
    }
    catch(err){
        res.status(401)
           .send("Something went wrong")
    }

})

//  ! Handling errors

app.use('/', (err, req, res, next) => {
    //  always use try and catch block while writing logic
    if (err) {
        res.status(500)
           .send("Something went wrong")
    }
})







// ! First we should connect to DB then only the server should start
connectDB()
    .then(() => {
        console.log("Database connected successful");
        app.listen(3000, () => {
            console.log("Server is listening on port 3000");
        })
    })
    .catch((err) => {
        console.log(err)
        console.log("Database cannot be connnected");
    }); 



