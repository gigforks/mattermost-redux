// Copyright (c) 2018-present ZeroChat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
/* eslint-disable global-require, no-process-env */

if (process.env.NODE_ENV === 'production') {
    module.exports = require('./configureStore.prod.js');
} else {
    module.exports = require('./configureStore.dev.js');
}

/* eslint-enable global-require, no-process-env */
