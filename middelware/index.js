const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const SERVER1_IP = process.env.SERVER1_IP;
const SERVER2_IP = process.env.SERVER2_IP;
const PORT1 = process.env.PORT1;
const PORT2 = process.env.PORT2;
const HEALTH_ENDPOINT = '/health';

let server1HealthData = {};
let server2HealthData = {};

async function fetchHealthData() {
  try {
    const server1Response = await axios.get(`http://${SERVER1_IP}:${PORT1}/health`);
    server1HealthData = server1Response.data;
    console.log('Datos de salud de server1:', server1HealthData);
  } catch (error) {
    server1HealthData = { status: 'ERROR', error: error.message };
  }

  try {
    const server2Response = await axios.get(`http://${SERVER2_IP}:${PORT2}/health`);
    server2HealthData = server2Response.data;
    console.log('Datos de salud de server2:', server2HealthData);
  } catch (error) {
    server2HealthData = { status: 'ERROR', error: error.message };
  }

  console.log('Datos de salud actualizados');
}

setInterval(fetchHealthData, 10000);

app.use(cors());

app.get('/data', (req, res) => {
  res.status(200).json({
    server1: server1HealthData,
    server2: server2HealthData,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
