# npm-rabbit
Consume registry update events and publish to Rabbit queues.

Configured to RabbitMQ instance and NPM registry instance by ENV variables as described below.

### Required ENV variables
#### RabbitMQ Configurations

##### RABBIT_EXCHANGE_NAME {string}
Sets the exchange against which to publish events.

##### RABBIT_ROUTE_KEY {string}
Sets the routing key for events published to the specified exchange. Match to routing key for listeners and queues on the consuming application.

##### RABBIT_PROTOCOL {string}
Values are either `amqp://` or `amqps://`, depending on the RabbitMQ service being used.

##### RABBIT_USER {string}
Username for RabbitMQ authentication.

##### RABBIT_PASSWORD {string}
Password for RabbitMQ authentication.

##### RABBIT_SERVER {string}
Server url to connect to RabbitMQ.

##### RABBIT_PORT {string}
Port on which to connect to the server url of RabbitMQ.

##### RABBIT_V_HOST {string}
RabbitMQ Virtual Host inside which the specified exchange should be run, and to which the user can connect.

#### NPM Registry Configurations

##### REGISTRY_URL {string}
Url of the NPM CouchDB registry to be followed.

#### Example ENV variables.
The below values are used for following the official NPM registry and when connecting to a local RabbitMQ instance running with the default users and vhosts as described on [Rabbit's Access Control page](https://www.rabbitmq.com/access-control.html).

```javascript
{
    REGISTRY_URL        : 'https://skimdb.npmjs.com/registry/_changes?descending=true&limit=10',
    RABBIT_EXCHANGE_NAME: 'amqp.topic',
    RABBIT_ROUTE_KEY    : 'package_updated',
    RABBIT_PROTOCOL     : 'amqp://',
    RABBIT_USER         : 'guest',
    RABBIT_PASSWORD     : 'guest',
    RABBIT_SERVER       : 'localhost',
    RABBIT_PORT         : 5672,
    RABBIT_V_HOST       : '/'
}
```