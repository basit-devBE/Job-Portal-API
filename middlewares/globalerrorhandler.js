export const errorHandler = (req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    return res.status(statusCode).json({
            message: err.message,
            success: false,
            statusCode,
            stack: process.env.NODE_ENV === "production" ? null : err.stack,
    })
}

export const notFound = (req, res, next) => {
    const error = new Error(
            `The url requested cannot be found - ${req.originalUrl}`
    )
    res.status(404)
    next(error?.message)
}

                                       