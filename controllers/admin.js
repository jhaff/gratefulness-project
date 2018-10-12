const express = require('express');
const app = express();
const Nugget = require('../models/nugget.js');
const Comment = require('../models/comment.js');


app.get('/admin', (req, res) => {
    let nuggets;


  Nugget.find().then((foundNuggets) => {
      nuggets = foundNuggets;

      return Comment.find({
          'nuggetId': { $in: nuggets}
      });

      // return Comment.find({
      //     'nuggetId': { $in: [
      //         mongoose.Types.ObjectId('4ed3ede8844f0f351100000c'),
      //         mongoose.Types.ObjectId('4ed3f117a844e0471100000d'),
      //         mongoose.Types.ObjectId('4ed3f18132f50c491100000e')
      //     ]});
      // }

      // return Comment.find({nuggetId: req.params.id});
  }).then((comments) => {
      console.log('===================================')
      console.log(nuggets);
      console.log('===================================')
      console.log(comments);
      console.log('===================================')
      res.render('admin', { nuggets, comments });
  }).catch((err) => {
      console.log(err.message);
  });
});

  // Nugget.find()
  //   .then(nuggets => {
  //       Comment.find({nuggetId: req.params.id}).then((comments) => {
  //     // { nuggets: nuggets, comments:comments }
  //     // { nuggets, comments }
  //     return Comment.find({nuggetId: req.params.id});
  //       res.render('admin', { nuggets: nuggets, comments:comments });
  //   })
  //   .catch(error => {
  //     console.log(error);
  //   });






  app.delete('/admin/nugets/:id', (req, res) => {
         Review.findByIdAndRemove(req.params.id).then((nugget) => {
             res.status(200).send({
                 nugget: nugget
             });
         }).catch((err) => {
             res.status(400).send({
                 err: err
             })
         })
     });

module.exports = app;
