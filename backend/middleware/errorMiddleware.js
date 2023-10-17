const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

const errorHandler = (err, req, res, next) => {
    let statusCode = res.sstatusCodet === 200 ? 500 : res.statusCode;
    let message = err.message

    // Specifically for mongoose, to avoid weird errors.
    if (err.name === 'MongooseError' && err.message.includes('buffering timed out')) {
        statusCode = 504; // Gateway Timeout status code
        message = 'Database operation timed out';
    } else if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

export {
    notFound,
    errorHandler
}