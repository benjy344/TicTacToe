'use strict'
require('dotenv').config()

const path = process.env.BASIC_PATH

module.exports = {
    intern: {
        path: path,
        users: `${path}users`,
        createUsers: `${path}users/create`
    },
    session: {
        create: `${path}session/create`,
        destroy: `${path}session/destroy`
    },
    game: {
        wait: `${path}wait`,
        create: `${path}game/create`,
        start: `${path}game/start`,
        play: `${path}game/play`
    }
}