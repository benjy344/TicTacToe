'use strict'
require('dotenv').config()

const path = process.env.BASIC_PATH

module.exports = {
    intern: {
        path: path,
        users: `${path}users`,
        createUsers: `${path}users/create`,
        login: `${path}login`
    },
    session: {
        create: `${path}session/create`,
        destroy: `${path}session/destroy`
    }
}