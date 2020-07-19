import express from 'express';
import { userMovies } from '../model/userMovies';
import { movies } from '../model/movies';
import { users } from '../model/users';
import { Sequelize } from 'sequelize-typescript';
const router = express.Router();
const { Op } = require("sequelize");

router.use(function (req, res, next) {
    next();
});

router.get('/test', function (req, res) {
    res.json({ message: 'qwerty!!' });
});

router.get('/user/:userId/search', function (req, res) {

    const userId: any = req.params.userId;
    const searchStrings: any = req.query.text.split(',');
    const wildCard: any = [];
    searchStrings.forEach((each: any) => {
        const trim: any = each.trim();
        const fields: any = ['movieName', 'director', 'castAndCrew'];

        fields.forEach((eachField: any) => {
            wildCard.push(Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col(eachField)), {[Op.like]: `%${each.toLowerCase()}%`}
            ));
            wildCard.push(Sequelize.where(
                Sequelize.fn('LOWER', Sequelize.col(eachField)), {[Op.like]: `%${trim.toLowerCase()}%`}
            ));
        });

    });

    let userPay: any = {
        attributes: ['movieId', 'preference'],
        where: {
            userId
        },
        include: [
            {
                model: movies,
                attributes: ['movieId', 'movieName'],
                where: {
                    [Op.or]: wildCard
                },
                required: true
            }
        ]
    };

    userMovies.findAll(userPay).then((moviesResponse: any) => {
        moviesResponse = JSON.parse(JSON.stringify(moviesResponse));

        if (moviesResponse && moviesResponse.length) {

            let result: any = [];
            let preferenceMatch: any;
            moviesResponse.forEach((each: any) => {
                if (req.query.preference && (each.preference == req.query.preference)) {
                    preferenceMatch = {
                        movie: each.movies.movieName,
                        preference: each.preference 
                    };
                } else {
                    result.push({
                        movie: each.movies.movieName,
                        preference: each.preference
                    });
                }
            });
        
            result = result.sort((a, b) => (a.preference > b.preference) ? 1 : -1);

            if (preferenceMatch) {
                result.splice(0, 0, preferenceMatch);
            }
            
            res.json({
                success: true,
                'search term': req.query.text,
                matchedMovies: result
            });

        } else {
            res.json({
                success: true,
                message: 'no match found'
            });
        }
    }).catch((moviesFindError: any) => {
        console.log('Error in finding search term matched Movies', moviesFindError)
        res.json({
            success: false,
            message: 'Try after some time!'
        });
    });
});


router.get('/users', function (req, res) {

    users.findAll({
        attributes: ['userId'],
        include: [
            {
                model: userMovies,
                attributes: ['movieId', 'preference'],
                include: [
                    {
                        model: movies,
                        attributes: ['movieId', 'movieName'],
                    }
                ]
            }
        ]
    }).then((userResponse: any) => {
        userResponse = JSON.parse(JSON.stringify(userResponse));

        if (userResponse && userResponse.length) {
            const response: any = {
                success: true,
                result: []
            };

            userResponse.forEach((each: any) => {
                const eachUser: any = {};
                eachUser.user = each.userId;
                each.userMovies = each.userMovies.sort((a, b) => (a.movies.movieName > b.movies.movieName) ? 1 : -1);
                each.userMovies = each.userMovies.slice(0, 3);
                eachUser.movies = each.userMovies.map(m => m.movies.movieName)
                response.result.push(eachUser);
            });

            res.json(response);
        } else {
            res.json({
                success: false,
                message: 'No users found!'
            });
        }
        
    }).catch((usersFind: any) => {
        console.log('Error in finding Movies', usersFind)
        res.json({
            success: false,
            message: 'Try after some time!'
        });
    });
});

module.exports.router = router;