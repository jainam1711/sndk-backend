import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, ForeignKey, BelongsTo, AutoIncrement, PrimaryKey, AllowNull, Default } from 'sequelize-typescript';
import { Project } from './project.model';
import { User } from '../user/user.model';

@Table({
    timestamps: true,
    tableName: 'project_members'
})
export class ProjectMembers extends Model<ProjectMembers> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: string;

    @ForeignKey(() => Project)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    project_id: number;

    @ForeignKey(() => User)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    user_id: number;

    @Default(false)
    @Column(DataType.BOOLEAN)
    is_admin: boolean;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @BelongsTo(() => Project)
    project: Project;

    @BelongsTo(() => User)
    user: User;
}
