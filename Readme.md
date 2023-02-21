# Thread
## Purpose of the project
This project compares implementations of cpu intensive monte carlo simulation in main thread and worker thread, backend and frontend. 


## Getting started

1. Initialize project

- [ ] Your own node project: `npm init`. This command will walk you through the initialization
- [ ] Install node packages `npm i`
- [ ] Update dockerfile if necessary
- [ ] Install mocha for unit testing: https://mochajs.org/#installation: `npm install --global mocha`
2. Start application
- Entry-Point, defined in package.json, is _app.js_ so you can start the application via `npm start`
- alternatively, you can choose usual way to start node application: `node [filename.js]`
3. Run Unit Tests in _test_ folder: `npm run test`

4. Containerize Node Application
- Build image from dockerfile: `docker build . -t dominik/worker-threads-app`. See docker image via `docker images`.
- Run Container from image:  `docker run -p 8080:8080 -d dominik/worker-threads-app`. The application is configured to listen on port 8080.
