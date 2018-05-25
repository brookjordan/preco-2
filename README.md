# face

This README outlines the details of collaborating on this Ember application.
A short introduction of this app could easily go here.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)

## Installation

* `git clone <repository-url>` this repository
* `cd face`
* `yarn install`

## Running / Development

On first run, you'll probably want to migrate and seed the database with:
* `yarn run migrate`
* `yarn run seed`

You'll need to run 2 servers:
* The AJAX server to get data
* The UI, Ember application

To do so, in separate terminal sessions, run:
* `yarn run dev`
* `yarn run ajax`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Building

You're most likely to want to be in production mode when you build.
If so, run:
* `yarn run build`

To make a development build, use:
* `yarn run build:dev`

You can then run a server to run the build.
This is ran using:
* `yarn run serve`

### Deploying

To deploy, build the app for production and then copy the built files across to the server.
As a reminder, to build for production, run:
* `yarn install && yarn run build`

The required assets are:
* the `dist` folder
* the `ajax` folder
* the `fastboot-server.js` file
* the `package.json` file

On the server, install the production dependencies.
To do so, run:
* `yarn run deploy:install`

And then you'll need to open the deployment screen and restart the server.
You'll need to run:
* `screen -S preco-production`
Close the running server. [ctrl-c]
* `yarn run deploy:serve`
