// class ApiError extends Error {
//   constructor(
//     statusCode,
//     message = "samething went worng",
//     error = [],
//     stack = ""
//   )
  
//   {
//     super(message);
//     this.statusCode = statusCode;
//     this.data = null;
//     this.message = message;
//     this.success = false;
//     this.error = error;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export { ApiError };


class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    error = [],
    stack = ""
  ) {
    super(message);

    // Ensure statusCode is within the valid HTTP range
    if (typeof statusCode !== 'number' || statusCode < 100 || statusCode > 599) {
      console.warn(`⚠️ Invalid statusCode passed to ApiError: ${statusCode}. Defaulting to 500.`);
      statusCode = 500;
    }

    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };

