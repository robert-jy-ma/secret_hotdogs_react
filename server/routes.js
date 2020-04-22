// imports
// note - when require is given path of a folder, it looks for an index.js in that folder. 
// If there is one, it uses it. If there isn't, the require fails.
// https://stackoverflow.com/questions/5364928/node-js-require-all-files-in-a-folder
const express = require('express');
const DB = require('./database');

const router = express.Router();
// testing api
router.get('/api/hello', (req, res, next) => {
    res.json('Hello World :)');
});

// TODO: need a route for inserting hotdog details too 
// use await fetch(...method: 'POST', body: <hotdog details as JSON>) in frontend (e.g. home.js, add.js)
//      https://stackoverflow.com/questions/29775797/fetch-post-json-data
// and in this file (routes.js), maybe use router.post, then use the "req" variable to get the <hotdog details>
//      https://expressjs.com/en/guide/routing.html
router.get('/api/hotdogs', async (req, res) => {
    try {
        let hotdogs = await DB.hotdogs.all();
        res.json(hotdogs);
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// logging in - takes details from frontend (login.js)
router.post('/api/login', async (req, res) => {
    // res.json('Hello World again :)');
    const { email, password } = req.body;
    console.log("post email: " + email);
    console.log("post password: " + password);
    res.json({postEmail: email, postPassword: password});

    // try {
    //     // let login = await DB.users.login(email, password);
    //     // TODO: if login successful, return true
    // } catch(e) {
    //     console.log(e);
    //     // TODO: if login not successful, return false
    // }
})

module.exports = router;
