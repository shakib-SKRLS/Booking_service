const {BookingRepository} = require('../repository/index');
const axios = require('axios');
const { flightServiceURL } = require('../config/serverConfig');
const { ServiceError } = require('../utils/error');
class BookingService{
    constructor(){
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data){
       try {
        const flightId = data.flightId;
        const getFlightURL = `${flightServiceURL}/api/v1/flights/${flightId}`;
        const response = await axios.get(getFlightURL);
        const flightData = response.data?.data ?? response.data;

        if (!flightData || typeof flightData.totalSeats !== 'number' || typeof flightData.price !== 'number') {
            throw new ServiceError(
                'Invalid flight data received from flight service',
                `Flight ${flightId} returned invalid or incomplete data`,
                502
            );
        }

        if (data.numberOfSeats > flightData.totalSeats) {
            throw new ServiceError(
                'Not enough seats available',
                `Only ${flightData.totalSeats} seats are available`,
                400
            );
        }

        const totalCost = flightData.price * data.numberOfSeats;
        const remainingSeats = flightData.totalSeats - data.numberOfSeats;
        const updateFlightURL = `${flightServiceURL}/api/v1/flights/${flightId}`;
        await axios.patch(updateFlightURL, {
            totalSeats: remainingSeats
        });

        const bookingPayload = {
            ...data,
            totalCost
        };
        const booking = await this.bookingRepository.create(bookingPayload);
        const finalBooking = await this.bookingRepository.update(booking.id, { status: 'Confirmed' });
        return finalBooking;
       } catch (error) {
        console.log(error);
        if (error.name === 'RepositoryError' || error.name === 'ValidationError' || error.name === 'ServiceError') {
            throw error;
        }
        throw new ServiceError(
            'Something went wrong in the service layer',
            error.message || 'An unexpected error occurred',
            500
        );
       }
    }
}

module.exports = BookingService;