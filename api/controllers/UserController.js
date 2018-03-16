import Mongoose from 'mongoose'
import User     from '../../models/userModel.js'

const UserController = {
  getUsers: (request, reply) => {
    User.find({}, (err, users) => {
      console.log(users)
    })
  },
  getUser: (creds) => {
    User.findOne(creds, (err, user) => {
      console.log(user)
      if(err) return err
      return user
    })
  }

}

export default UserController