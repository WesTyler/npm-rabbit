'use strict';

const Amqp = require('amqplib');

const getChannel = function(options) {

    const connectionString = `${options.protocol}${options.user}:${options.password}@${options.server}:${options.port}/${options.vhost}?heartbeat=${options.heartbeat}`;

    return Amqp.connect(connectionString)
        .then(function(connection) {

            return connection.createConfirmChannel();
        })
        .then(function(channel) {

            return channel;
        })
};

module.exports = getChannel;