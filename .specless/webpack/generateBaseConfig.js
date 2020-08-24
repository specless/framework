const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");
const GenerateSSRPlugin = require('./plugins/GenerateSSR');
const SocketRelay = require('./plugins/SocketRelay');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const {
    MODULES,
    DYNAMIC_MODULES,
    LIBRARY_BUILD,
    LIBRARY_ROOT,
    CSF_URL,
    SERVER_ROOT,
    BUILD_HASH,
    BUILD_ID,
    PROJECT_NAME, 
    PROJECT_TYPE,
    DEMO_AD_DATA,
    BUILD_PATH,
    ASSETS_FOLDER,
    CONFIG_MODULE,
    DEMO_DATA,
    SETTINGS_MODULE,
    LOCAL_SERVER
} = require('./../constants');

const moduleAliases = [
    'react',
    'react-dom'
]

module.exports = (process, env, args) => {
    
    const config = {
        output: {
            path: BUILD_PATH,
        },
        entry: {},
        plugins: [],
        resolve: {
            alias: {}
        },
        module: {
            rules: []
        },
        devtool: 'cheap-module-source-map'
    }

    // Add assets folder alias
    config.resolve.alias['@assets'] = ASSETS_FOLDER;
    config.resolve.alias['@specless/config'] = CONFIG_MODULE;
    config.resolve.alias['@specless/data'] = DEMO_DATA;
    config.resolve.alias['@specless/settings'] = SETTINGS_MODULE;

    
    // Add shared module aliases
    fs.readdirSync(MODULES).forEach((folder) => {
        const pathToModule = path.join(MODULES, `${folder}/${process}.js`);
        if (fs.existsSync(pathToModule)) {
            if (moduleAliases.includes(folder)) {
                config.resolve.alias[folder] = pathToModule;
            } else {
                config.resolve.alias[`@specless/${folder}`] = pathToModule;
            }
        }
    })

    // Add dynamically loaded Library modules to entry config
    if (['panels', 'placement'].includes(process)) {
        fs.readdirSync(DYNAMIC_MODULES).forEach((file) => {
            const name = file.replace('.js', '');
            config.entry[`specless.${name}`] = path.join(DYNAMIC_MODULES, file);
        })
    }
    
    if (process !== 'demo-pages') {
        config.output.libraryTarget = 'var';
        config.plugins.push(new GenerateSSRPlugin());
        config.plugins.push(new EsmWebpackPlugin());
    }

    config.plugins.push(new webpack.DefinePlugin({
        LIBRARY_BUILD: JSON.stringify(LIBRARY_BUILD),
        LIBRARY_ROOT: JSON.stringify(LIBRARY_ROOT),
        CSF_URL: JSON.stringify(CSF_URL),
        SERVER_ROOT: JSON.stringify(SERVER_ROOT),
        BUILD_HASH: JSON.stringify(BUILD_HASH),
        BUILD_ID: JSON.stringify(BUILD_ID),
        PROJECT_NAME: JSON.stringify(PROJECT_NAME),
        PROJECT_TYPE: JSON.stringify(PROJECT_TYPE),
        DEMO_AD_DATA: JSON.stringify(DEMO_AD_DATA),
        LOCAL_SERVER: JSON.stringify(LOCAL_SERVER)
    }))

    
    
    if (args.mode === 'development') {
        config.plugins.push(new SocketRelay({
            process
        }));
    } else {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: `stats.${process}.html`,
            openAnalyzer: false
        }))
    }

    config.module.rules.push({
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
                    ["@babel/plugin-transform-react-jsx", {
                        "pragmaFrag": "React.Fragment"
                    }],
                    ['import', { libraryName: "antd", style: true }]
                ]
            }
        }
    })

    config.module.rules.push({
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
    })

    config.module.rules.push({
        test: /\.css$/,
        use: [
            {
                loader: 'raw-loader'
            }
        ]
    })

    let lessConfig = [
        {
            loader: 'raw-loader',
        },
        {
            loader: 'less-loader',
            options: {
                javascriptEnabled: true
            }
        }
    ]

    if (process === 'demo-pages') {
        lessConfig = [
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
    }

    config.module.rules.push({
        test: /\.less$/,
        use: lessConfig
    })


    return config

}