export interface CreateProject {
  name: string;
  members: Array<Member>;
}

interface Member {
  user_id: number;
  is_admin: boolean;
}

export interface CreateTask {
  project_id: number;
  name: string;
  description: string;
}

export interface ChangeStatus {
  status: number;
  task_id: number;
  project_id: number;
}