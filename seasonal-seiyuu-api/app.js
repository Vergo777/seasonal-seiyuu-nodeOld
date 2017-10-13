import { currentSeasonSummaryHandler, seiyuuDetailsHandler } from './seasonalSeiyuu';

const express = require('express');
const app = express();
  
app.use(express.static('public'));

app.get('/currentSeasonSummary', function (req, res) {
    currentSeasonSummaryHandler().then(function(currentSeasonSeiyuuArray) {
        res.json(currentSeasonSeiyuuArray);
    })
});

app.get('/seiyuuDetails/:seiyuuID', function (req, res) {
    let seiyuuID = req.params.seiyuuID; 
    seiyuuDetailsHandler(seiyuuID).then(function(seiyuuDetails) {
        res.json(seiyuuDetails);
    })
    .catch(function(err) {
        return res.sendStatus(500);
    });
});

app.listen(4500, function () {
    console.log('Example app listening on port 4500!')
});