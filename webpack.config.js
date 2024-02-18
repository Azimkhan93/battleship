const path = require('path');

const config = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'production',
    plugins: [],
    module: {
        rules: [
            {
                test: /\.ts$/i,
                loader: 'ts-loader',
                include: [path.resolve(__dirname, 'src')],
                exclude: ['/node_modules/'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
    },
    target: 'node',
};

module.exports = config;
