// Optional: MQTT Subscriber for bonus task
require('dotenv').config();
const mqtt = require('mqtt');
const mongoose = require('mongoose');
const Sensor = require('./models/Sensor');
const connectDB = require('./config/db');

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || 'mqtt://localhost:1883';
const TOPIC = 'iot/sensor/+/temperature';

async function startMQTT() {
  await connectDB();
  const client = mqtt.connect(MQTT_BROKER_URL);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe(TOPIC, (err) => {
      if (err) console.error('MQTT subscribe error:', err);
      else console.log('Subscribed to', TOPIC);
    });
  });

  client.on('message', async (topic, message) => {
    try {
      // topic: iot/sensor/{deviceId}/temperature
      const match = topic.match(/^iot\/sensor\/(.+)\/temperature$/);
      if (!match) return;
      const deviceId = match[1];
      const temperature = parseFloat(message.toString());
      if (!deviceId || isNaN(temperature)) return;
      const sensorData = new Sensor({
        deviceId,
        temperature,
        timestamp: Date.now(),
      });
      await sensorData.save();
      console.log(`Saved MQTT data: ${deviceId} - ${temperature}`);
    } catch (err) {
      console.error('MQTT message error:', err);
    }
  });
}

startMQTT();
