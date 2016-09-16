'use strict';

const RegistryChanges = require('concurrent-couch-follower'),
      Clean           = require('normalize-registry-metadata');

const dataHandler = function(data, done) {
    let cleanData = Clean(data.doc);

    console.log(cleanData);

    done();
};

const options = {
    db          : 'https://skimdb.npmjs.com/registry/_changes?descending=true&limit=10',
    include_docs: true,
    sequence    : '.sequence',
    now         : true,
    concurrency : 10
};

RegistryChanges(dataHandler, options);