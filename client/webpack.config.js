const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebpackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
module.exports = {
    entry: {
        main:"/src/index.js"
    },
    output: {
        path: path.join(__dirname,"dist"),
        filename:"[name].[chunkhash].js"
    },
    resolve: {
        extensions:[".js",".jsx"]
    },
    module: {
        rules :[
            {
                test:/\.(js|jsx)/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css/,
                use:["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [htmlPlugin]
}