const Sensor = require('../models/Sensor');

// POST /api/sensor/ingest
exports.ingestSensorData = async (req, res) => {
  try {
    const { deviceId, temperature, timestamp } = req.body;
    if (typeof deviceId !== 'string' || typeof temperature !== 'number') {
      return res.status(400).json({ error: 'deviceId (string) and temperature (number) are required.' });
    }
    const sensorData = new Sensor({
      deviceId,
      temperature,
      timestamp: typeof timestamp === 'number' ? timestamp : Date.now(),
    });
    const saved = await sensorData.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /api/sensor/:deviceId/latest
exports.getLatestSensorData = async (req, res) => {
  try {
    const { deviceId } = req.params;
    const latest = await Sensor.findOne({ deviceId })
      .sort({ timestamp: -1, createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ error: 'No data found for this deviceId' });
    }
    res.json(latest);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
