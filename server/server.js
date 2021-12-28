const express = require('express');
const fs = require('fs');
const app = express();
const stats = require('./stats');
const cart = require('./cartRouter');//обработчик всех запросов корзины
app.use(express.json());

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin', 'example.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/', express.static('../public'));
app.use('/db/userCart.json', cart);
app.use('/db/stats.json', stats);




// app.get();
// app.post();
// app.put();
// app.delete();

app.get('/db/products.json', (req, res) => {
    fs.readFile('db/products.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    });
});

// app.get('/api/cart/:id', (req, res) => {
//    // res.send(req.params.id);
//     res.send(req.query);
// });

const port = process.env.PORT || 5500;
app.listen(port, () => console.log(`Listen on port ${port}...`));