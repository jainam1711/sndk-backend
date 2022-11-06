// Libraries
import { Response } from "express";
import { Controller, Body, Post, Req, Res, UseBefore, Get, Put } from "routing-controllers";

// Helpers
import { CREATE_PROJECT, CREATE_TASK, CHANGE_STATUS } from './helpers/project.validator';

// Services
import { ProjectService } from './project.service';
import { AuthMiddleware } from "../../core/middlewares/auth.middleware";

@Controller('/project')
@UseBefore(AuthMiddleware)
export class ProjectController {

  constructor(
    private readonly _service: ProjectService
  ) { }

  /**
   * @author Jainam Shah
   * @description Create project
   */
  @Post()
  async createProject(@Req() req: any, @Body() body: CREATE_PROJECT, @Res() res: Response) {
    const data = await this._service.createProject(body, req.user.id);
    return res.send(data);
  }

  /**
   * @author Jainam Shah
   * @description View task of particular project
   */
  @Get('/:id([0-9]+)')
  async viewTasks(@Req() req: any, @Res() res: Response) {
    const data = await this._service.viewTasks(+req.params.id, req.user.id);
    return res.send(data);
  }

  /**
   * @author Jainam Shah
   * @description Create task for a project
   */
  @Post('/task')
  async createTask(@Req() req: any, @Body() body: CREATE_TASK, @Res() res: Response) {
    const data = await this._service.createTask(body, req.user.id);
    return res.send(data);
  }

  /**
   * @author Jainam Shah
   * @description Change status for a particular task of a project
   */
  @Put('/task/change-status')
  async changeStatus(@Req() req: any, @Body() body: CHANGE_STATUS, @Res() res: Response) {
    const data = await this._service.changeStatus(body, req.user.id);
    return res.send(data);
  }

}
