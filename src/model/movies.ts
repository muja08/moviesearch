import { Model, PrimaryKey, DataType, Table, Column, HasMany } from 'sequelize-typescript';
import { DeletedAt, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { userMovies } from './userMovies';
@Table({
    timestamps: true,
    paranoid: true,
})
export class movies extends Model<movies> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public movieId: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    public movieName: string;

    @Column({
        allowNull: false,
        type: DataType.JSON,
      })
    public castAndCrew: JSON;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    public director: string;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
        
    @HasMany(() => userMovies)
    public userMovies: userMovies[];
}
