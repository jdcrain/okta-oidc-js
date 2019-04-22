import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { Promise, hash } from 'rsvp';

export default Route.extend({
  auth: service(),
  router: service(),

  async beforeModel(transition) {
    this._super(...arguments);

    const authService = this.auth;

    const isAuthenticatedPromise = new Promise(function(resolve) {
      authService.isAuthenticated().then(authenticated => {
        resolve(authenticated);
      });
    });

    const checkUserInfo = new Promise(function(resolve) {
      isAuthenticatedPromise.then(authenticated => {
        if (authenticated && !authService.user) {
          authService.getUser().then(user => {
            if (
              !authService.get('isDestroyed') &&
              !authService.get('isDestroying')
            ) {
              authService.set('user', user);
              resolve(user);
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    });

    return await hash({
      isAuthenticated: isAuthenticatedPromise,
      checkUser: checkUserInfo,
      handleAuthenticated: isAuthenticatedPromise.then(authenticated => {
        if (authenticated) {
          return true;
        }

        let route;

        // Ember.js 3.6+
        if (transition.to || this.router.currentRoute) {
          route = transition.to || this.router.currentRoute;
        } else {
          route = transition;
        }

        // TODO: Save the model also? Could possibly use urlFor https://api.emberjs.com/ember/3.8/classes/RouterService/methods?anchor=urlFor
        if (route) {
          authService.setFromRoute(
            route.name || route.targetName,
            route.queryParams
          );
        } else {
          authService.setFromRoute('/');
        }

        const onAuthRequired =
          authService.getOktaConfig().onAuthRequired ||
          authService.onAuthRequired;

        if (onAuthRequired) {
          onAuthRequired(authService, this.router);
        } else {
          authService.loginRedirect();
        }
      }),
    });
  },
});
