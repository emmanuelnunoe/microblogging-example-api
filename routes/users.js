var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

// Models
var User = require('../models/Users');

var db = mongoose.connection;

/* GET users listing ordered by creationdate. */

router.get('/', function (req, res, next) {
  User.find()
    .sort('-creationdate')
    .exec(function (err, users) {
      if (err) err.status(500).send(err);
      else res.status(200).json(users);
    });
});

//POST de un nuevo usuario
router.post('/', function (req, res) {
  var new_user = req.body;
  //ToDo(hacer algo con el nuevo usuario)
  res
    .status(200)
    .send('Usuario' + req.body.name + 'ha sido anandido satisfactoriamente');
});

//PUT de un usuario por su Id

router.put('/:id', function (req, res) {
  var update_user = req.body;
  //ToDo(hacer algo con el usuario)
  res
    .status(200)
    .send('Usuario' + req.body.name + 'ha sido actualizado satisfactoriamente');
});

// DELETE de un usuario por sus Id

router.delete('/:id', function (req, res) {
  //ToDo(hacer algo con el usuario)
  res
    .status(200)
    .send(
      'Usuario con id' + req.params.id + 'ha sido borrado satisfactoriamente'
    );
});

// GET de un unico usuario por su Id
router.get('/:id', function (req, res, next) {
  User.findById(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.status(200).json(userinfo);
  });
});

// POST de un nuevo usuario
router.post('/', function (req, res, next) {
  User.create(req.body, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// PUT de un usuario existente identificado por su Id
router.put('/:id', function (req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

// DELETE de un usuario existente identificado por su ID

router.delete('/:id', function (req, res, next) {
  User.findByIdAndDelete(req.params.id, function (err, userinfo) {
    if (err) res.status(500).send(err);
    else res.sendStatus(200);
  });
});

//Comprueba si el usuario existe
router.post('/signin', function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) res.status(500).send(err);
    // Si el usuario existe...
    if (user != null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return next(err);
        //Si el password es correcto...
        if (isMatch)
          res
            .status(200)
            .send({ message: 'ok', role: user.role, id: user._id });
        else res.send({ message: 'Credenciales inválidas' });
      });
    } else {
      res.send({ message: 'Credenciales inválidas' });
    }
  });
});
module.exports = router;
