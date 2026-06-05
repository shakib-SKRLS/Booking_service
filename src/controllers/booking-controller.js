const {BookingService} = require('../services/index');
const bookingService = new BookingService();
const {StatusCodes} = require('http-status-codes');



const create=async (req,res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        res.status(StatusCodes.OK).json(response);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
}

module.exports = {
    create
}