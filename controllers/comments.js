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

    // DELETE
    app.delete('/nuggets/:nuggetId/comments/:id', function(req, res) {
        console.log("DELETE comment")
        Comment.findByIdAndRemove(req.params.id).then((nugget) => {
            res.redirect(`/nuggets/${req.params.nuggetId}/admin`);
        }).catch((err) => {
            console.log(err.message);
        })
    })

module.exports = app;
