import { StatusCodes } from 'http-status-codes';

export const TASK_CREATED = {
    status: StatusCodes.OK,
    message: 'Task created successfully',
};

export const TASK_NOT_FOUND = {
    status: StatusCodes.NOT_FOUND,
    message: 'Task not found',
};

export const NO_ACCESS_FOR_STATUS_CHANGE = {
    status: StatusCodes.CONFLICT,
    message: 'You are not authorized to change status of this task',
};

export const STATUS_UPDATED = {
    status: StatusCodes.OK,
    message: 'Task status updated successfully',
};
