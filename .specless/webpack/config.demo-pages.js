const generateBaseConfig = require('./generateBaseConfig.js');
const path = require('path');
const { DEMO_PAGE_MODULES } = require('./../constants');
const GenerateHTML = require('./plugins/GenerateHTML');


module.exports = (env, args) => {
    const config = generateBaseConfig('demo-pages', env, args);
    for (let key in DEMO_PAGE_MODULES) {
        config.entry[`demo.${key}`] = DEMO_PAGE_MODULES[key];
    }
    config.plugins.push(new GenerateHTML());
    
    config.resolve.alias['react'] = 'preact/compat';
    config.resolve.alias['react-dom'] = 'preact/compat';
    
    config.module.rules.push({
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
    })

    config.module.rules.push({
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
    })
    
    return config
}

// module.exports = (env, args) => {
    
//     const entry = {};
//     for (let key in DEMO_PAGE_MODULES) {
//         entry[`demo.${key}`] = DEMO_PAGE_MODULES[key];
//     }
//     const config = {
//         entry: entry,
//         output: {
//             path: path.resolve(__dirname, '../../build'),
//         },
//         resolve: {
//             alias: {
//                 'react': 'preact/compat',
//                 'react-dom': 'preact/compat',
//                 '@utils': path.resolve(__dirname, '../src/utils'),
//                 '@vendor': path.resolve(__dirname, '../src/vendor'),
//                 '@demo-page': path.resolve(__dirname, '../src/demo-page/index.js')
//             }
//         },
//         plugins: [
//             new GenerateHTML(),
//             new webpack.DefinePlugin({
//                 LIBRARY_BUILD: JSON.stringify(LIBRARY_BUILD),
//                 LIBRARY_ROOT: JSON.stringify(LIBRARY_ROOT),
//                 CSF_URL: JSON.stringify(CSF_URL),
//                 SERVER_ROOT: JSON.stringify(SERVER_ROOT),
//                 BUILD_HASH: JSON.stringify(BUILD_HASH),
//                 BUILD_ID: JSON.stringify(BUILD_ID),
//                 PROJECT_NAME: JSON.stringify(PROJECT_NAME),
//                 PROJECT_TYPE: JSON.stringify(PROJECT_TYPE),
//                 DEMO_AD_DATA: JSON.stringify(DEMO_AD_DATA)
//             }),
//         ],
//         module: {
//             rules: [
//                 {
//                     test: /\.(js|jsx)$/,
//                     exclude: /(node_modules|bower_components)/,
//                     use: {
//                         loader: 'babel-loader',
//                         options: {
//                             presets: [
//                                 "preact",
//                                 [
//                                     "@babel/preset-env",
//                                     {
//                                         "targets":{
//                                            "esmodules": true
//                                         }
//                                     }
//                                 ]
//                             ],
//                             plugins: [
//                                 ["@babel/plugin-proposal-class-properties"],
//                                 ["import-directory"],
//                                 ["@babel/plugin-transform-react-jsx", {
//                                     "pragmaFrag": "React.Fragment"
//                                 },],
//                                 ['import', { libraryName: "antd", style: true }]
//                             ]
//                         }
//                     }
//                 },
//                 {
//                     test: /\.(jpe?g|png|gif|svg)$/i,
//                     use: [
//                         {
//                             loader: 'file-loader',
//                             options: {
//                                 name: 'demo.assets.[name].[ext]'
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     test: /\.less$/,
//                     use: [
//                         {
//                             loader: 'style-loader',
//                         },
//                         {
//                             loader: 'css-loader'
//                         },
//                         {
//                             loader: 'less-loader',
//                             options: {
//                                 javascriptEnabled: true,
//                                 modifyVars: {
//                                     'layout-header-height': '52px'
//                                 }
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     test: /\.html$/,
//                     use: [
//                         {
//                             loader: 'file-loader',
//                             options: {
//                                 limit: 0,
//                                 name: 'slot.[name].html'
//                             }
//                         }
//                     ]
//                 },
//                 {
//                     test: /\.(js|html)$/i,
//                     include: [
//                         path.resolve(__dirname, '../src/vendor/safeframe'),
//                         path.resolve(__dirname, '../src/vendor/specless')
//                     ],
//                     use:  [
//                         {
//                             loader: 'file-loader',
//                             options: {
//                                 name: 'vendor.[name].[ext]'
//                             }
//                         }
//                     ]
//                 }
//             ]
//         }
//     }

//     fs.readdirSync(MODULES).forEach((folder) => {
//         config.resolve.alias[`@specless/${folder}`] = path.resolve(MODULES, `${folder}/${PROCESS}.js`)   
//     })

//     if (args.mode === 'development') {
//         config.plugins.push(new SocketRelay({
//             process: 'demo-pages'
//         }));
//     }

//     return config
// }