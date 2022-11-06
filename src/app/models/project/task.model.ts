import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, AllowNull, Default, Comment } from 'sequelize-typescript';
import { Project } from './project.model';
import { User } from '../user/user.model';

@Table({
  timestamps: true,
  tableName: 'tasks'
})
export class Task extends Model<Task> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: string;

  @ForeignKey(() => Project)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  project_id: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  created_by: number;

  @Default(1)
  @Comment('1-> Pending, 2-> In-Progress, 3-> Completed')
  @Column(DataType.TINYINT)
  status: number;

  @Column(DataType.DATE)
  completed_at: Date;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Project)
  project: Project;

  @BelongsTo(() => User)
  user: User;
}
