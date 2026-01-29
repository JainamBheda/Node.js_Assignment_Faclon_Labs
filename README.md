# Faclon Sensor Backend Service

A Node.js backend service for ingesting and retrieving IoT sensor data using Express, MongoDB Atlas, and Mongoose.

## Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- (Optional) mqtt

## Setup Instructions

1. **Clone the repository**
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   - Copy `.env` and set your `MONGODB_URI` (MongoDB Atlas connection string)
   - Set `PORT` if needed (default: 3000)
4. **Start the server:**
   ```bash
   node server.js
   ```

## API Endpoints

### 1. Ingest Sensor Data
- **POST** `/api/sensor/ingest`
- **Body:**
  ```json
  {
    "deviceId": "sensor-01",
    "temperature": 32.1,
    "timestamp": 1705312440000
  }
  ```
- **Notes:**
  - `deviceId` (string) and `temperature` (number) are required.
  - `timestamp` is optional (defaults to current time).
- **Response:**
  - 201 with saved document
  - 400 for validation errors

### 2. Get Latest Sensor Data
- **GET** `/api/sensor/:deviceId/latest`
- **Response:**
  - 200 with latest document
  - 404 if not found

## Bonus: MQTT Subscriber
- (Optional) Use the `mqtt` package to subscribe to `iot/sensor/+/temperature` and ingest data automatically.

## License
MIT
