# Booking_service

A booking microservice for the airline booking system.

## Tech
- Node.js, Express 5
- MySQL with Sequelize and Sequelize CLI — `Booking` model
- Axios — calls the flight service (default `http://localhost:3001`, `FLIGHT_SERVICE_URL` env var)

## API endpoints
Base path: `/api/v1`.

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/v1/bookings` | Create a booking |

## How to run
```bash
npm install
cp .env.example .env   # PORT (default 3002), FLIGHT_SERVICE_URL, and MySQL settings
npx sequelize-cli db:migrate
npm start
```

## License
MIT
