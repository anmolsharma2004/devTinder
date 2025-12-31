const express = require("express");

const app = express();

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
app.get('/ab?c', (req, res) => {
    res.send("It means the 'b' in the route handler is optional which means if we make a call like 'ac' it will also work");
});

app.get('/ab+c', (req, res) => {
    res.send("It means we can write anything after 'b' while making the call but it should always end with 'c' eg.- '/ab dfveruveue c' ");
});

app.get('/ab*cd', (req, res) => {
    res.send("It means we can add anything between ab and cd like abANMOLcd, the call will work")
})

app.get('/a(bc)+d', (req, res) => {
    res.send("It means we can also group these also")
})

app.get(/a/, (req, res) => {
    res.send("This is regex which means if anywhere in the url 'a' appears it will work")
})

app.get(/.*fly$/, (req, res) => {
    res.send("This is a complex regex it means if anything ends with a 'fly' it will work")
})





app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})