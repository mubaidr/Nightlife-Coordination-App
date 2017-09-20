const router = require('express').Router()
const Bars = require('../models').Bar

router.get('/api/bars', (req, res, next) => {
  let location = req.body.location

  Bars.find({
    location: location || ''
  }).exec((err, result) => {
    if (err) next(err)

    res.json(result)
  })
})

router.post('/api/bars', (req, res, next) => {
  let id = req.body.id

  Bars.findById(id).exec((err, bar) => {
    if (err) next(err)

    let user = req.account

    if (bar.going.findIndex(u => u._id === user.data._id) === -1) {
      bar.going.push(user)

      bar.save((err) => {
        if (err) next(err)

        Bars.find({}).exec((err, allBars) => {
          res.json(allBars)
        })
      })
    } else {
      Bars.find({}).exec((err, allBars) => {
        res.json(allBars)
      })
    }
  })
})

module.exports = router
