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

app.post('/user', (req, res) => {
    res.send("Data successfully saved to the DB")
})

app.delete('/user', (req, res) => {
    res.send("User deleted successfully")
})


app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})