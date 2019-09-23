const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();

app.use(express.static('.'));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log('server is running');
});

app.get('/catalogData', (req, res) => {
  fs.readFile('catalog.json', 'utf-8', (err, data) => {
    res.send(data);
  })
});

app.post('/addToCart', (req, res) => {
  fs.readFile('cart.json', 'utf-8', (err, data) => {
    const cart = JSON.parse(data);
    const item = req.body;

    cart.push(item);
    fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
      if (err) {
        res.send(JSON.stringify({
          result: 0
        }))
      } else {
        res.send(JSON.stringify({
          result: 1
        }))
      }
    })
  })
});