import Hapi                 from 'hapi'
import swaggered            from 'hapi-swaggered'
import swaggeredUI          from 'hapi-swaggered-ui'
import vision               from 'vision'
import inert                from 'inert'
import Nes                  from 'nes'
import Mongoose             from 'mongoose'
import UserModel            from './models/userModel.js'
import SessionController    from './api/controllers/SessionController.js'
import routes               from './api/routes/Routes'
// import Db                   from './api/conf/Db'

require('dotenv').config()

if (!process.env.PATH || !process.env.DB_CON || !process.env.APP_IP || !process.env.APP_PORT) {
  throw 'Make sure you defined DB_CON, FLEET_ID, APP_IP, APP_PORT and PATH in your .env file'
}

const server   = new Hapi.Server()
exports.server = server

server.connection({ port: process.env.APP_PORT, host: process.env.APP_IP, routes: { cors: true }, labels: ['api'] })

server.register([
    vision,
    inert,
    {
        register: swaggered,
        options: {
            auth: false,
            info: {
                title: 'TIC TAC TOE',
                description: 'API DOCUMENTATION',
                version: '1.0'
            }
        }
    },
    {
        register: swaggeredUI,
        options: {
            title: 'TIC TAC TOE API',
            path: '/docs',
            auth: false,
            authorization: {
                field: 'apiKey',
                valuePrefix: 'bearer ',
                defaultValue: 'demoKey',
                placeholder: 'Enter your apiKey here'
            },
            swaggerOptions: {}
        }
    }
], {
    select: 'api'
}, err => { if (err) { throw err } })



/* ##### PREPARE WEB-SOCKET ##### */
server.register(Nes, err => {
    if (err) {
      console.log(err)
      throw err
    }
    SessionController.broadcast = data => server.broadcast(data)
})

/* ##### INITIALIZE DB CONNECTION ##### */
const urlDB = process.env.DB_CON

Mongoose.connect(urlDB)



/* ##### START THE CODE GENERATOR ##### */
//SpaceCraftController.codeGenerator()


/* ##### LOAD API SERVER ROUTES ##### */
routes(server)

server.start((err) => {
    if (err) {
        throw err
    }
    console.log('Server running at:', server.info.uri)
})