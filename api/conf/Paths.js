'use strict'
require('dotenv').config()

const path = process.env.BASIC_PATH

module.exports = {
    intern: {
        path: path,
        users: `${path}users`,
        createUsers: `${path}users/create`
    },
    users: {
        getById: `${path}users/{id}`,
        getStats: `${path}users/{id}/getStats`
    },
    session: {
        create: `${path}session/create`,
        destroy: `${path}session/destroy`
    },
    game: {
        wait: `${path}game/wait`,
        quit: `${path}game/quit`,
        create: `${path}game/create`,
        start: `${path}game/start`,
        play: `${path}game/play`,
        playIa: `${path}game/playIa`
    }
}