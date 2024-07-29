const lazyImports = [
  '@nestjs/websockets/socket-module',
  '@nestjs/microservices/microservices-module',
];

module.exports = (options, webpack) => ({
  ...options,
  entry: ['./src/main.ts'],
  externals: [],
  output: {
    ...options.output,
    libraryTarget: 'commonjs2',
  },
  plugins: [
    ...options.plugins,
    new webpack.IgnorePlugin({
      checkResource(resource) {
        return lazyImports.includes(resource);
      },
    }),
  ],
});
