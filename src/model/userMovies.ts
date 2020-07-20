import { Model, PrimaryKey, DataType, Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { DeletedAt, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import { users } from './users';
import { movies } from './movies';
@Table({
    timestamps: true,
    paranoid: true,
})
export class userMovies extends Model<userMovies> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public id: string;

    @ForeignKey(() => users)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public userId: string;

    @ForeignKey(() => movies)
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public movieId: string;

    @Column({
        allowNull: false,
        type: DataType.INTEGER,
    })
    public preference: number;

    @DeletedAt public deletedAt: Date;
    
    @BelongsTo(() => users, { targetKey: 'userId' })
    public users: users;

    @BelongsTo(() => movies, { targetKey: 'movieId' })
    public movies: movies;
}
