import Mongoose from 'mongoose'
import User     from '../../models/userModel.js'

const UserController = {
  getUsers: (request, reply) => {
    console.log('getUsers')
    User.find({}, (err, users) => {
      console.log(users)
    })
  },
  getUser: (creds, cb) => {
    User.findOne(creds, (err, user) => {
      if(err) return cb(null, err)
      return cb(user)
    })
  }

}

export default UserController