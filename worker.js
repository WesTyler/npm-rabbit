'use strict';

const RegistryChanges = require('concurrent-couch-follower'),
      Clean           = require('normalize-registry-metadata'),
      Helpers         = require('./helpers');

let _internals = {
    channel             : null,
    exchangeName        : process.env.RABBIT_EXCHANGE_NAME,
    routeKey            : process.env.RABBIT_ROUTE_KEY,
    registryOptions     : {
        db          : process.env.REGISTRY_URL,
        include_docs: true,
        sequence    : '.sequence',
        now         : true,
        concurrency : 5
    },
    rabbitChannelOptions: {
        protocol : process.env.RABBIT_PROTOCOL,
        user     : process.env.RABBIT_USER,
        password : process.env.RABBIT_PASSWORD,
        server   : process.env.RABBIT_SERVER,
        port     : process.env.RABBIT_PORT,
        vhost    : process.env.RABBIT_V_HOST,
        heartbeat: 2000
    }
};

const dataHandler = function(data, done) {
    console.log('Data received:', data.id);
    let cleanData = Clean(data.doc);

    Helpers.publishMessage(_internals.channel, _internals.exchangeName, _internals.routeKey, cleanData, done);
};

Helpers.getChannel(_internals.rabbitChannelOptions)
    .then((channel) => {
        console.log('Connected to Rabbit channel.');

        _internals.channel = channel;

        Helpers.createPublisher(_internals.channel, _internals.exchangeName);

        RegistryChanges(dataHandler, _internals.registryOptions);
    });