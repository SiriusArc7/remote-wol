const express = require('express');
const bodyParser = require('body-parser');
const wol = require('wol');
const config = require('./config.json'); // 新たに追加

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/wol', (req, res) => {
  const currentTime = new Date();
  const key = req.body.key;

  if (
    (currentTime.getHours() >= 11 && currentTime.getHours() < 13) ||
    (currentTime.getHours() >= 15 && currentTime.getHours() < 19)
  ) {
    if (key === config.postValue) { // config.jsonから値を取得
      const options = {
        address: '255.255.255.255',
        port: 9,
      };

      wol.wake(config.macAddress, options, (err) => {
        if (err) {
          console.error(`WoL failed: ${err.message}`);
          res.status(500).send('Wake-on-LAN failed');
        } else {
          console.log(`WoL packet sent successfully to ${config.macAddress}`);
          res.status(200).send('Wake-on-LAN sent successfully');
        }
      });
    } else {
      res.status(403).send('Invalid key');
    }
  } else {
    res.status(403).send('Server is only active between 11:00-13:00 and 15:00-19:00');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

