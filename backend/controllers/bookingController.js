const bookings = [];

const isValidDateTime = (date, time) => {
  const bookingDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  return bookingDateTime > now;
};

const hasConflictingBooking = (date, time) => {
  return bookings.some(booking => {
    return booking.date === date && booking.time === time;
  });
};

exports.createBooking = (req, res) => {
  try {
    const { date, time, guests, name, contact } = req.body;
    
    if (!date || !time || !guests || !name || !contact) {
      return res.status(400).json({
        success: false,
        error: 'All fields are required'
      });
    }

    if (guests < 1 || guests > 20) {
      return res.status(400).json({
        success: false,
        error: 'Number of guests must be between 1 and 20'
      });
    }

    if (!/^\+?[\d\s-]{10,}$/.test(contact)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid contact number format'
      });
    }

    if (!isValidDateTime(date, time)) {
      return res.status(400).json({
        success: false,
        error: 'Booking must be for a future date and time'
      });
    }

    if (hasConflictingBooking(date, time)) {
      return res.status(400).json({
        success: false,
        error: 'This time slot is already booked'
      });
    }

    const newBooking = {
      id: Date.now().toString(),
      date,
      time,
      guests: Number(guests),
      name,
      contact,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    bookings.push(newBooking);

    res.status(201).json({
      success: true,
      data: newBooking
    });

  } catch (error) {
    console.error('Create Booking Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create booking'
    });
  }
};

exports.getBookings = (req, res) => {
  try {
    const sortedBookings = [...bookings].sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.time}`);
      const dateB = new Date(`${b.date}T${b.time}`);
      return dateA - dateB;
    });
    
    res.status(200).json({
      success: true,
      data: sortedBookings
    });

  } catch (error) {
    console.error('Get Bookings Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch bookings'
    });
  }
};

exports.getBookingById = (req, res) => {
  try {
    const { id } = req.params;
    const booking = bookings.find(b => b.id === id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    res.status(200).json({
      success: true,
      data: booking
    });

  } catch (error) {
    console.error('Get Booking Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch booking'
    });
  }
};

exports.deleteBooking = (req, res) => {
  try {
    const { id } = req.params;
    const bookingIndex = bookings.findIndex(booking => booking.id === id);
    
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Booking not found'
      });
    }

    const booking = bookings[bookingIndex];
    const bookingDateTime = new Date(`${booking.date}T${booking.time}`);
    if (bookingDateTime < new Date()) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete past bookings'
      });
    }
    
    bookings.splice(bookingIndex, 1);
    
    res.status(200).json({
      success: true,
      message: 'Booking deleted successfully'
    });

  } catch (error) {
    console.error('Delete Booking Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete booking'
    });
  }
};