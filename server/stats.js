const moment = require('moment');
const express = require('express');
const fs = require('fs');
const router = express.Router();

const log = (req) => {
    return {
        Date: moment().format('lll'),
        NameProduct: req.body.name,
        Move: req.body.move
    };

}

router.post('/', (req, res) => {
    fs.readFile('db/stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let stats = JSON.parse(data);
            stats.logs.push(log(req));
            fs.writeFile('db/stats.json', JSON.stringify(stats, null, 4), (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                }
                else{
                    res.send(JSON.stringify({result: 1}));
                }
            });
        }
    });
})

module.exports = router;