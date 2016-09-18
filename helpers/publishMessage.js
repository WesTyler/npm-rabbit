'use strict';

var publishMessage = function(channel, exchangeName, routeKey, message, doneCallback, options) {
    options = options || {};

    const messageBuffer = new Buffer(JSON.stringify({message}));

    channel.publish(exchangeName, routeKey, messageBuffer, options);

    console.log('Data published');

    doneCallback();
};

module.exports = publishMessage;