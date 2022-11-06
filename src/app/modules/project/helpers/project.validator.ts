import { IsString, IsOptional, IsBoolean, IsInt, IsIn } from 'class-validator';

export class CREATE_PROJECT {
  @IsString() name: string;
  @IsOptional() members: Array<MEMBER>;
}

class MEMBER {
  @IsInt() user_id: number;
  @IsBoolean() is_admin: boolean;
}

export class CREATE_TASK {
  @IsInt() project_id: number;
  @IsString() name: string;
  @IsString() description: string;
}

export class CHANGE_STATUS {
  @IsInt() task_id: number;
  @IsInt() project_id: number;
  @IsInt() @IsIn([1, 2, 3]) status: number;
}