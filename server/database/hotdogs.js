// imports
const dbindex = require('./index.js');

// return all hotdogs with id and readable timestamps
const all = async () => {
    return new Promise((resolve, reject) => {
        dbindex.firebase.firestore().collection('hotdogs').get()
        .then(data => {
            // note: each "row" is a "DocumentSnapshot": https://firebase.google.com/docs/reference/js/firebase.firestore.DocumentSnapshot
            let hotdogs = [];
            data.forEach(row => {
                // add document id
                formattedRow = row.data();
                formattedRow["id"] = row.id;
                formattedRow.ts = row.data().ts.seconds;
                hotdogs.push(formattedRow);
            });
            return resolve(hotdogs);
        })
        .catch(err => {
            console.log(err);
            return reject(err);
        })
    });
}

exports.all = all;
// TODO: define all hotdog table stuff here (i.e. get, insert, update, etc.)