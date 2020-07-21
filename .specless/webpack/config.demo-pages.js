const path = require('path');
const GenerateHTML = require('./plugins/GenerateHTML');
const SocketRelay = require('./plugins/SocketRelay');
const entry = {};
const { DEMO_PAGE_MODULES } = require('./../constants');

module.exports = (env, args) => {
    const entry = {};
    for (let key in DEMO_PAGE_MODULES) {
        entry[`demo.${key}`] = DEMO_PAGE_MODULES[key];
    }
    const config = {
        entry: entry,
        output: {
            path: path.resolve(__dirname, '../../build'),
        },
        resolve: {
            alias: {
                'react': 'preact/compat',
                'react-dom': 'preact/compat',
                '@utils': path.resolve(__dirname, '../src/utils'),
                '@vendor': path.resolve(__dirname, '../src/vendor'),
                '@demo-page': path.resolve(__dirname, '../src/demo-page/index.js')
            }
        },
        plugins: [
            new GenerateHTML(),
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
                                "@babel/preset-env",
                            ],
                            plugins: [
                                ["@babel/plugin-proposal-class-properties"],
                                ["import-directory"],
                                ["@babel/plugin-transform-react-jsx", {
                                    "pragmaFrag": "React.Fragment"
                                },],
                                ['import', { libraryName: "antd", style: true }]
                            ]
                        }
                    }
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'demo.assets.[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: 'style-loader',
                        },
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    'layout-header-height': '52px'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                limit: 0,
                                name: 'slot.[name].html'
                            }
                        }
                    ]
                },
                {
                    test: /\.(js|html)$/i,
                    include: [
                        path.resolve(__dirname, '../src/vendor/safeframe'),
                        path.resolve(__dirname, '../src/vendor/specless')
                    ],
                    use:  [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'vendor.[name].[ext]'
                            }
                        }
                    ]
                }
            ]
        }
    }

    if (args.mode === 'development') {
        config.plugins.push(new SocketRelay({
            process: 'demo-pages'
        }));
    }

    return config
}