const router = require('express').Router()
const Bars = require('../models').Bar

router.get('/api/bars', (req, res, next) => {
  let location = req.body.location

  let obj = location ? {
    location: location
  } : {}

  Bars.find(obj).exec((err, result) => {
    if (err) next(err)

    res.json(result)
  })
})

router.post('/api/bars', (req, res, next) => {
  let id = req.body.id

  Bars.findById(id).exec((err, bar) => {
    if (err) next(err)

    let user = req.account
    let index = bar.going.indexOf(user.data._id)

    if (index === -1) {
      bar.going.push(user.data._id)
    } else {
      bar.going.splice(index, 1)
    }

    bar.save((err) => {
      if (err) next(err)

      Bars.find({}).exec((err, allBars) => {
        if (err) next(err)

        res.json(allBars)
      })
    })
  })
})

module.exports = router
