'use strict';

const connectQueue = function(channel, queueName, exchangeName, routingKey) {
    return channel.bindQueue(queueName, exchangeName, routingKey);
};

module.exports = connectQueue;