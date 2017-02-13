'use strict';

const RegistryChanges = require('concurrent-couch-follower'),
      Clean           = require('normalize-registry-metadata'),
      BunnyBus        = require('bunnybus'),
      bunnyBus        = new BunnyBus({
          protocol : process.env.RABBIT_PROTOCOL,
          user     : process.env.RABBIT_USER,
          password : process.env.RABBIT_PASSWORD,
          server   : process.env.RABBIT_SERVER,
          port     : process.env.RABBIT_PORT,
          vhost    : process.env.RABBIT_V_HOST
      });

let _internals = {
    exchangeName        : process.env.RABBIT_EXCHANGE_NAME,
    routeKey            : process.env.RABBIT_ROUTE_KEY,
    registryOptions     : {
        db          : process.env.REGISTRY_URL,
        include_docs: true,
        sequence    : '.sequence',
        now         : true,
        concurrency : 5
    }
};

const dataHandler = function(data, done) {
    let cleanData = Clean(data.doc);

    bunnyBus.publish({event: _internals.routeKey, body: cleanData}, done);
};

RegistryChanges(dataHandler, _internals.registryOptions);