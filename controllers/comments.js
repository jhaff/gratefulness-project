const mongoose = require('mongoose');
const Nugget = require('../models/nugget.js');
const express = require('express');
const app = express();
const Comment = require('../models/comment')

mongoose.connect('mongodb://localhost:27017/gratefulness-project', {
    useMongoClient: true
});

    //NEW
    app.get('/nuggets/:nuggetId/comments/new', (req, res) => {
        res.render('comments-new', { nuggetId: req.params.nuggetId });
    })

    // CREATE
    app.post('/nuggets/:nuggetId/comments', (req, res) => {
        Comment.create(req.body)
            .then(comment => {
                console.log(comment)
                console.log(req.params.nuggetId)
                res.redirect(`/nuggets/${req.params.nuggetId}`);
            }).catch(error => {
                console.log(error.message);
            });
    });

    // SHOW
    app.get('/movies/:movieId/reviews/:id', (req, res) => {
        // find review
        Review.findById(req.params.id).then(review => {
            // fetch its comments
            Comment.find({
                reviewId: req.params.id
            }).then(comments => {
                // respond with the template with both values
                res.render('reviews-show', {
                    review: review,
                    comments: comments
                })
            })
        }).catch((err) => {
            // catch errors
            console.log(err.message)
        });
    });

    // EDIT
    app.get('/movies/:movieId/reviews/:id/edit', function(req, res) {
        Review.findById(req.params.id, function(err, review) {
            res.render('reviews-edit', {
                review: review
            });
        })
    })

    // UPDATE
    app.put('/movies/:movieId/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/movies/${req.params.movieId}`);
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/movies/:movieId/reviews/:id', function(req, res) {
        console.log("DELETE review")
        Review.findByIdAndRemove(req.params.id).then((review) => {
            res.redirect(`/movies/${req.params.movieId}`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

module.exports = app;
