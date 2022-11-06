import { StatusCodes } from 'http-status-codes';

export const PROJECT_CREATED = {
    status: StatusCodes.OK,
    message: 'Project created successfully',
};

export const PROJECT_NOT_FOUND = {
    status: StatusCodes.NOT_FOUND,
    message: 'Project not found',
};

export const INVALID_PROJECT_USER = {
    status: StatusCodes.CONFLICT,
    message: 'You are not allowed to view other admin\'s tasks',
};

export const NON_MEMBER_OPERATION = {
    status: StatusCodes.CONFLICT,
    message: 'You are not a part of this project to create task',
};
