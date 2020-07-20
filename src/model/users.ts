import { Model, PrimaryKey, DataType, Table, Column, HasMany } from 'sequelize-typescript';
import { DeletedAt } from 'sequelize-typescript';
import { userMovies } from './userMovies';
@Table({
    timestamps: true,
    paranoid: true,
})
export class users extends Model<users> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public userId: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    public userName: string;

    @Column({
        defaultValue: null,
        type: DataType.STRING,
    })
    public relationship: string;

    @Column({
        defaultValue: null,
        type: DataType.INTEGER,
    })
    public age: number;

    @DeletedAt public deletedAt: Date;
    
    @HasMany(() => userMovies)
    public userMovies: userMovies[];
}
