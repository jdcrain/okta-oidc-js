import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { stubOktaAuthService } from '@okta/okta-ember/test-support/stub-auth-service';

module('Unit | Route | WithAuth', function(hooks) {
  setupTest(hooks);
  stubOktaAuthService(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:with-auth');

    assert.ok(route);
  });
});
