var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/Users');
var db = mongoose.connection;

/* GET users listing. */
// router.get('/', function (req, res) {
//   res.json({
//     users: [
//       {
//         id: 123,
//         name: 'Eladio Guardiola',
//         phones: {
//           home: '800-123-4567',
//           mobile: '877-123-1234',
//         },
//         email: ['jd@example.com', 'jd@example.org'],
//         dateOfBirth: '1980-01-02t00:00:00.0002',
//         registered: true,
//       },
//       {
//         id: 456,
//         name: 'Namesio Tornero',
//         phones: {
//           home: '800-123-3498',
//           mobile: '877-438-1278',
//         },
//         email: ['pt@example.com', 'pt@example.org'],
//         dateOfBirth: '1983-01-09t00:00:00.0002',
//         registered: false,
//       },
//     ],
//   });
// });

// //GET  de un usuario por su id
// router.get('/:id', function (req, res) {
//   if (req.params.id == '123') {
//     res.json({
//       id: 123,
//       name: 'Eladio Guardiola',
//       phones: {
//         home: '800-123-4567',
//         mobile: '877-123-1234',
//       },
//       email: ['jd@example.com', 'jd@example.org'],
//       dateOfBirth: '1980-01-02t00:00:00.000z',
//       registered: true,
//     });
//   } else res.status(404).send('Lo siento, el item no se ha encontrado');
// });

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

// GET del listado de los usuarios ordenados por fecha de creacion

router.get('/', function (req, res, next) {
  User.find()
    .sort('-creationdate')
    .exec(function (err, users) {
      if (err) err.status(500).send(err);
      else res.status(200).json(users);
    });
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

/* Check if user exists */
router.post('/signin', function (req, res, next) {
  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) res.status(500).send(err);
    // If user exists...
    if (user != null) {
      user.comparePassword(req.body.password, function (err, isMatch) {
        // If password is correct...
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
