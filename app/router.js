import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route(
    'home',
    {
      path: '/',
    },
    function() {
      this.route(
        'person',
        {
          path: '/:personid',
        }
      );
    }
  );
  this.route('chat');
});

export default Router;
