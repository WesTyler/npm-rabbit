'use strict';

var createQueue = function(channel, options) {
    return channel.assertQueue(options.queueName, options.defaults)
};

module.exports = createQueue;