const express = require('express');
const cors = require('cors');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 4000;
const INSTANCE_ID = process.env.INSTANCE_ID || 'backend-instance';

app.use(cors());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', date: new Date(), instance: INSTANCE_ID });
});

app.listen(PORT, async () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});
