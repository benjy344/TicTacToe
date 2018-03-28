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
  getStats: (request, reply) => {
    console.log(request.params)
    User.findOne({'_id':request.params.id}, (err, user) => {
      const stats = {total:0, win:0, lose:0, equality: 0}
      if(err) console.log('error get stats', err)
      if(user) {
        stats.total = user.games.length
        for (let i = 0, len = user.games.length; i < len; i++) {
          let game = user.games[i]
          switch (game.status) {
            case "win":
              stats.win++
              break;
            case "lose":
              stats.lose++
              break;
            case "equality":
              stats.equality++
              break;
            default:
              break;
          }
        }
      }
      reply(stats, null)


    })
  },
  getUserById: (request, cb) => {
    User.findOne({_id:request.params.id}, (err, user) => {
      if(err || !user){
        console.log('error get user by id ', err)
        return cb(err)
      }
      cb(user, null)
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