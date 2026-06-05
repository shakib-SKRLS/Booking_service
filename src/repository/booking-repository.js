const {Booking} = require('../models/index');
const {ValidationError, AppError} = require('../utils/error/index');
class BookingRepository{
    async create(data){
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError'){
               throw new ValidationError(error);
            }
            
            throw new AppError(
                'RepositoryError',
                'Something went wrong in the repository layer',
                'An unexpected error occurred',
                500
            );
        }
    }
    async update(bookingId, data){
        try {
            const booking = await Booking.findByPk(bookingId);
            if(data.status){
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            throw new AppError(
                'RepositoryError',
                'Something went wrong in the repository layer',
                'An unexpected error occurred',
                500
            );
        }
    }
}

module.exports = BookingRepository;