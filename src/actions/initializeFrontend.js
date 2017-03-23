'use strict'

const db = require('./../db')

const action = {}

/**
 * Require user
 * @type {boolean}
 */
action.requireUser = false

/**
 * Execute the action
 * @param {WebSocketUser} user
 * @param {*} message
 * @param {function} callback
 */
action.execute = function (user, message, callback) {
  // if we've got some login credentials than check against db if login is valid
  var userData = db.get('users').get(message.loginData.id).cloneDeep().value()
  var valid = userData && userData.loginHash == message.loginData.hash
  if (valid) {
    // set the socket userdata if valid login
    user.userData = userData
  }
  callback(valid)
}

module.exports = action