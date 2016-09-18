'use strict';

var createPublisher = function(channel, exchangeName) {
    const defaults = {
        durable          : true,
        internal         : false,
        autoDelete       : false,
        alternateExchange: null,
        arguments        : null
    };

    return channel.assertExchange(exchangeName, 'topic', defaults);
};

module.exports = createPublisher;