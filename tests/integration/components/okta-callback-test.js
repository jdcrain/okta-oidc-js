import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { stubOktaAuthService } from '@okta/okta-ember/test-support/stub-auth-service';

module('Integration | Component | okta-callback', function(hooks) {
  setupRenderingTest(hooks);
  stubOktaAuthService(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{okta-callback}}`);

    assert.equal(this.element.textContent.trim(), '');

    // Template block usage:
    await render(hbs`
      {{#okta-callback}}
        template block text
      {{/okta-callback}}
    `);

    assert.equal(this.element.textContent.trim(), 'template block text');
  });
});
