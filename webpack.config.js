const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

console.clear();
console.info('\n============ Building App ============');

module.exports = {
    entry: path.join(__dirname, "frontend", "index.js"),
    output: {
        path: path.resolve(__dirname, "wwwroot"),
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /(\.s[ac]ss|\.css)$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: ['file-loader'],
            },
            {
                test: /\.?js(x)?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    },
                }
            },
            {
                test: /\.svg$/,
                exclude: /node_modules/,
                issuer: /\.[jt]sx?$/,
                use: [{loader: '@svgr/webpack', options: {exportType: 'named'}}]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "frontend", "index.html"),
        }),
    ],
}
