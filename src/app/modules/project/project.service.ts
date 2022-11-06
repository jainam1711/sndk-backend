// Libraries
import { Service } from 'typedi';
import { StatusCodes } from 'http-status-codes';

// Services, Instance (Sequelize)
import { sequelize } from '../../core/db/sequilize';
import { Config } from '../../core/config';

// Helpers
import { CreateProject, CreateTask, ChangeStatus } from './helpers/project.interface';

// Utils
import { logger } from '../../core/logger';
import { sendSuccessResponse, throwAnError } from '../../core/helper/response-handler';

@Service()
export class ProjectService {

    taskModel = sequelize.models.Task;
    projectModel = sequelize.models.Project;
    projectMembersModel = sequelize.models.ProjectMembers;

    constructor(
        private readonly config: Config,
    ) { }

    /**
     * @author Jainam Shah
     * @description Create project in the system
     */
    async createProject(body: CreateProject, user_id: number) {
        const transaction = await sequelize.transaction();
        try {
            const projectData = { ...body, created_by: user_id }
            const project = await this.projectModel.create(projectData, { transaction });

            const members = [{ user_id, is_admin: true }, ...body.members]
            const projectMembers = members.map((e: any) => {
                e.project_id = project.id;
                return e;
            });
            await this.projectMembersModel.bulkCreate(projectMembers, { transaction });

            await transaction.commit();
            const { message, status } = this.config.MESSAGES.PROJECT_CREATED;
            return sendSuccessResponse(status, true, null, message);
        } catch (error) {
            logger.error('createProject Catch: ', error);
            if (transaction) await transaction.rollback();
            throw throwAnError(error);
        }
    }

    /**
     * @author Jainam Shah
     * @description View task of particular project
     */
    async viewTasks(project_id: number, user_id: number) {
        try {
            const project = await this.projectModel.findOne({
                attributes: ['name', 'created_by'], where: { id: project_id },
                include: [{
                    model: this.taskModel,
                    attributes: ['name', 'description', 'status']
                }]
            });
            if (!project) throw this.config.MESSAGES.PROJECT_NOT_FOUND;
            if (project.created_by !== user_id) throw this.config.MESSAGES.INVALID_PROJECT_USER;
            return sendSuccessResponse(StatusCodes.OK, true, project);
        } catch (error) {
            logger.error('viewTasks Catch: ', error);
            throw throwAnError(error);
        }
    }

    /**
     * @author Jainam Shah
     * @description Create task in a project
     */
    async createTask(body: CreateTask, user_id: number) {
        const transaction = await sequelize.transaction();
        try {
            const project = await this.projectModel.findOne({
                attributes: ['id'], where: { id: body.project_id },
                include: [{
                    attributes: ['user_id'], model: this.projectMembersModel
                }]
            });

            if (!project) throw this.config.MESSAGES.PROJECT_NOT_FOUND;
            const member = project.members.find((member: any) => member.user_id === user_id);
            if (!member) throw this.config.MESSAGES.NON_MEMBER_OPERATION;

            const task = { ...body, created_by: user_id }
            await this.taskModel.create(task);
            const { message, status } = this.config.MESSAGES.TASK_CREATED;
            return sendSuccessResponse(status, true, null, message);
        } catch (error) {
            logger.error('createTask Catch: ', error);
            if (transaction) await transaction.rollback();
            throw throwAnError(error);
        }
    }

    /**
     * @author Jainam Shah
     * @description Change status of particular task of a project
     */
    async changeStatus(body: ChangeStatus, user_id: number) {
        try {
            const project = await this.projectModel.findOne({
                attributes: ['id'], where: { id: body.project_id },
                include: [{
                    attributes: ['user_id', 'is_admin'], model: this.projectMembersModel
                }]
            });

            if (!project) throw this.config.MESSAGES.PROJECT_NOT_FOUND;
            const member = project.members.find((member: any) => member.user_id === user_id);
            if (!member) throw this.config.MESSAGES.NON_MEMBER_OPERATION;

            const task = await this.taskModel.findOne({
                attributes: ['id', 'created_by'], where: { id: body.task_id }
            });
            if (!task) throw this.config.MESSAGES.TASK_NOT_FOUND;
            if (task.created_by === user_id || member.is_admin) {
                await this.taskModel.update(
                    { status: body.status }, { where: { id: task.id } }
                );
            } else throw this.config.MESSAGES.NO_ACCESS_FOR_STATUS_CHANGE;

            const { message, status } = this.config.MESSAGES.STATUS_UPDATED;
            return sendSuccessResponse(status, true, null, message);
        } catch (error) {
            logger.error('viewTasks Catch: ', error);
            throw throwAnError(error);
        }
    }

}
