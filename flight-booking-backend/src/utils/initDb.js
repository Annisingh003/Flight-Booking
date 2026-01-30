
const pool = require("../config/database");
const { init: initUsers } = require("../models/User");
const { init: initFlights } = require("../models/Flight");
const { init: initBookings } = require("../models/Booking");
const { init: initAttempts } = require("../models/BookingAttempt");

const initDb = async () => {
  console.log("🛠️  Initializing database tables...");

  try {
    // Enable pgcrypto extension for UUID generation
    await pool.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');

    // Initialize tables in order
    await initUsers();
    await initFlights();
    await initBookings();
    await initAttempts();

    console.log("✅ Database tables initialized successfully");
    return true;
  } catch (error) {
    console.error("❌ Database initialization failed:", error.message);
    return false;
  }
};

module.exports = initDb;
