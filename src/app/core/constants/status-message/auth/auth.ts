import { StatusCodes } from 'http-status-codes';

export const UNAUTHORIZED = {
    status: StatusCodes.UNAUTHORIZED,
    message: 'Please login to continue'
};

export const WRONG_PASSWORD = {
    status: StatusCodes.CONFLICT,
    message: 'Incorrect Username or Password'
};

export const USER_NOT_EXIST = {
    status: StatusCodes.CONFLICT,
    message: 'Please enter valid email or password'
};

export const EMAIL_EXISTS_ALREADY = {
    status: StatusCodes.CONFLICT,
    message: 'Email address is already registered with us',
};

export const USER_REGISTERED = {
    status: StatusCodes.OK,
    message: 'You have successfully registered with us, please login to continue',
};
