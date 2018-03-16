//import Mongoose from 'mongoose'
//import User          from '../../models/userModel.js'
import UserController    from '../controllers/UserController.js'


function getUserScheme(req) {

  let username
  let type
  let userSearch = {}

  // The POST contains a username and not an email
  if(req.body.username) {
    pseudo     = req.body.username
    type       = 'username'
    userSearch = { pseudo: username }
  }
  // The POST contains an email and not an username
  else if(req.body.email) {
    pseudo     = req.body.email
    type       = 'email'
    userSearch = { email: username }
  }

  return {
    pseudo    : username,
    type      : type,
    userSearch: userSearch
  }
}

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), 'patate', { expiresInMinutes: 60*5 })
}


const SessionController = {

  create: (req, res) => {
    console.log('jnkjnkjjknjknjnjnjkkjnnjn')
    const userScheme = getUserScheme(req)

    if (!userScheme.username || !req.body.password) {
      return res.status(400).send("You must send the username and the password")
    }

    const user = UserController.getUser(creds)

    //const user = _.find(users, userScheme.userSearch)

    if (!user) {
      return res.status(401).send({message:"The username or password don't match", user: user})
    }

    if (user.password !== req.body.password) {
      return res.status(401).send("The username or password don't match")
    }
    console.log('kjnjn')
    res.status(201).send({
      id_token: createToken(user)
    })
  }

}

export default SessionController