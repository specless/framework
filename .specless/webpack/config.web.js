const path = require('path');
const webpack = require('webpack');
const { LIBRARY_ROOT, LIBRARY_BUILD, CSF_URL, SERVER_ROOT, BUILD_HASH, BUILD_PATH, CONFIG_MODULE, DEMO_DATA, BUILD_ID, PROJECT_NAME, PROJECT_TYPE, PANEL_MODULES } = require('./../constants');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const GenerateSSRPlugin = require('./plugins/GenerateSSR');
module.exports = {
    output: {
        path: BUILD_PATH,
        libraryTarget: 'var'
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../src/modules/specless.react.js'),
            'react-dom': path.resolve(__dirname, '../src/modules/specless.react-dom.js'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@vendor': path.resolve(__dirname, '../src/vendor'),
            '@assets': path.resolve(__dirname, '../../src/assets'),
            '@specless/components': path.resolve(__dirname, '../src/modules/specless.components.js'),
            '@specless/utils': path.resolve(__dirname, '../src/modules/specless.utils.js'),
            '@specless/config': CONFIG_MODULE,
            '@specless/data': DEMO_DATA
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            LIBRARY_BUILD: JSON.stringify(LIBRARY_BUILD),
            LIBRARY_ROOT: JSON.stringify(LIBRARY_ROOT),
            CSF_URL: JSON.stringify(CSF_URL),
            SERVER_ROOT: JSON.stringify(SERVER_ROOT),
            BUILD_HASH: JSON.stringify(BUILD_HASH),
            BUILD_ID: JSON.stringify(BUILD_ID),
            PROJECT_NAME: JSON.stringify(PROJECT_NAME),
            PROJECT_TYPE: JSON.stringify(PROJECT_TYPE),
        }),
        new GenerateSSRPlugin(),
        new EsmWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            "preact",
                            [
                                "@babel/preset-env",
                                {
                                    "targets":{
                                       "esmodules": true
                                    }
                                }
                            ]
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-class-properties"],
                            ["import-directory"],
                            ["@babel/plugin-transform-react-jsx", {
                                "pragmaFrag": "React.Fragment"
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1500,
                            name: 'assets.[name].[ext]'
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {}
                    }
                ]
            }
        ]
    }
}