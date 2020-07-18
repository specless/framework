const path = require('path');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const GenerateSSRPlugin = require('./plugins/GenerateSSR');
module.exports = {
    output: {
        path: path.resolve(__dirname, '../../build'),
        libraryTarget: 'var'
    },
    resolve: {
        alias: {
            'react': path.resolve(__dirname, '../src/modules/specless.react.js'),
            'react-dom': path.resolve(__dirname, '../src/modules/specless.react-dom.js'),
            '@utils': path.resolve(__dirname, '../src/utils'),
            '@vendor': path.resolve(__dirname, '../src/vendor'),
            '@assets': path.resolve(__dirname, '../../src/assets'),
            '@specless/env': path.resolve(__dirname, '../src/modules/shared.env.js'),
            '@specless/components': path.resolve(__dirname, '../src/modules/specless.components.js'),
            '@specless/utils': path.resolve(__dirname, '../src/modules/specless.utils.js')
        }
    },
    plugins: [
        new GenerateSSRPlugin(),
        new EsmWebpackPlugin()
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