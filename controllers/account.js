const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const Account = require('../models/account')


module.exports = {
  addAccount: async (req, res) => {
    try {
      const existedAccount = await Account.findOne({
        username: req.body.username
      });
      if (existedAccount) {
        res.status(404).send({
          message: 'Username already exist',
        });
      } else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, async function (err, hash) {
            if (!err) {
              const newAccount = await Account.create({
                username: req.body.username,
                password: hash,
                email: req.body.email
              });
              res.status(200).send({
                message: 'Account Created',
                newAccount
              })
            } else {
              res.status(400).send({
                message: 'error'
              })
            }
          })
        })
      }
    } catch (error) {
      res.status(400).send({
        message: 'account failed to create',
        error: error.message
      })
    }
  },
  login: async (req, res) => {
    try {
      const existedAccount = await Account.findOne({
        username: req.body.username
      });
      const valid = bcrypt.compareSync(req.body.password, existedAccount.password)
      if(valid) {
        const token = await jwt.sign({
          data: existedAccount
        },"secretcode", {
          expiresIn: "2h"
        }
        );
        res.send({
          token
        });
      } else {
        res.send({
          message: 'password is not valid',
        })
      }
    } catch(error){
      res.send({
        error: true,
        message: 'belum terdaftar'
      })
    }
  },
  loginComplete: (req, res) => {
    new_account = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    Account.update({_id: req.user_id}, {$set: new_account})
    .then(data=> {
      let token = jwt.sign({ account: data_id}, 'secretcode')
      res.send({ token , data: new_account})
    }).catch (err => {
      res.send(err)
    })
  }

}