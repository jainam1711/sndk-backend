import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, DeletedAt, AutoIncrement, PrimaryKey, AllowNull, Unique } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users'
})
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING(50))
  name: string;

  @Unique('email')
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING(150))
  password: string;

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @DeletedAt
  deleted_at: Date;
}
