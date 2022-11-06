import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany, PrimaryKey, AutoIncrement, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Task } from './task.model';
import { User } from '../user/user.model';
import { ProjectMembers } from './project-member.model';

@Table({
    timestamps: true,
    tableName: 'projects'
})
export class Project extends Model<Project> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: string;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    created_by: number;

    @AllowNull(false)
    @Column(DataType.STRING(60))
    name: string;

    @Column(DataType.STRING)
    logo_url: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => Task, { onDelete: 'CASCADE', hooks: true })
    tasks: Task[];

    @HasMany(() => ProjectMembers, { onDelete: 'CASCADE', hooks: true })
    members: ProjectMembers[];
}