import express from 'express';
const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('public'));

const publicKey = '009e32091293e7d1531b865c1241db7f';

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
