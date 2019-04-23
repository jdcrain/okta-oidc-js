import { getContext } from '@ember/test-helpers';
import Service from '@ember/service';
import { Promise } from 'rsvp';

let stubbedService = Service.extend({
  init() {
    this._super(...arguments);
  },

  async isAuthenticated() {
    return Promise.resolve(true);
  },

  async handleAuthentication() {
    return Promise.resolve(true);
  },

  loginRedirect() {
    return 'loginRedirect';
  },

  async getUser() {
    return Promise.resolve({});
  },
});

export function initAuthService(service) {
  let { owner } = getContext();
  let stubbedAuthService = owner.register(
    'service:auth',
    service || stubbedService
  );
  return stubbedAuthService;
}

export function stubOktaAuthService(hooks = self) {
  hooks.beforeEach(function() {
    if (!this.owner) {
      throw new Error(
        'You must call one of the ember-qunit setupTest(),' +
          ' setupRenderingTest() or setupApplicationTest() methods before' +
          ' calling stubOktaAuthService()'
      );
    }

    initAuthService();
  });
}
