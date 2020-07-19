import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware';
import DbConnection from './db';
import config from '../../webpack.dev.config'

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  noInfo: true
}))

app.use(webpackHotMiddleware(compiler, {
  log: false,
  path: "/__what",
  heartbeat: 2000
}))

app.get('/', (req, res, next) => {
  console.log(HTML_FILE);
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  });
})

app.get('/resources', async (req, res, next) => {
  console.log('fetching resources');
  const db = await DbConnection.getConnection();
  console.log(db)
  res.json(await db.collection('resources').find({}).toArray());
});

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})