// Copyright (c) 2018-present TF Chat, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        client: './src/client/client.js',
        client4: './src/client/client4.js',
        websocket: './src/client/websocket_client.js',
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        library: ['TFChat', '[name]'],
        filename: 'tfchat.[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'flow'],
                    },
                },
            },
        ],
    },
    plugins: [
        new UglifyPlugin({sourceMap: true}),
    ],
    devtool: 'source-map',
};
