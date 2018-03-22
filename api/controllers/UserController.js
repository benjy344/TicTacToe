import Mongoose from 'mongoose'
import User     from '../../models/userModel.js'
import bcrypt   from 'bcrypt'

const UserController = {

  getUsers: (request, reply) => {
    console.log('getUsers')
    User.find({}, (err, users) => {
      console.log(users)
    })
  },

  createUser: (req, cb) => {
    const payload = req.payload
    const salt    = bcrypt.genSaltSync(10)
    const hash    = bcrypt.hashSync(payload.password, salt)

    const user = new User({pseudo:payload.username, email:payload.email,  password:hash})

    user.save((err, user) => {
      if(err) {
        console.log(err)
        return cb(null, {errorMessage: "error"})
      }
      user.password = payload.password
      return cb(user)
    })
  },

  getUser: (creds, cb) => {
    const password = creds.password
    const search   = {}
    if(creds['pseudo']){
      search['pseudo'] = creds['pseudo']
    } else {
      search['email'] = creds['email']
    }
    console.log(search)
    User.find(search, (err, users) => {
      if(err) return cb(null, err)
      console.log(users, users.length)
      for (let i = 0, len = users.length; i < len; i++) {
        let user = users[i]
        console.log(creds.password, user.password, bcrypt.compareSync(creds.password, user.password))
        if(bcrypt.compareSync(creds.password, user.password) )
          return cb(user)
      }

      return cb(null, null)

      //return cb(user)
    })
  }

}

export default UserController