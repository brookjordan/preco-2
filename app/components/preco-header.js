import Component from '@ember/component';
import { and, readOnly } from '@ember/object/computed';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  mainHeaderToggle:  service(),
  tagName:           'header',
  classNames:        ['main-header'],
  classNameBindings: [
    'isHidden:main-header--hidden',
    'hideDynamically:main-header--hide-dynamically',
    'headerTheme',
  ],
  hideDynamically: readOnly('mainHeaderToggle.hideDynamically'),
  isHidden: and('mainHeaderToggle.hideDynamically', 'mainHeaderToggle.isHidden'),

  headerTheme: computed('mainHeaderToggle.theme', function() {
    return `main-header--theme-${ get(this, 'mainHeaderToggle.theme') }`;
  }),

  init() {
    this._super(...arguments);
    get(this, 'headerisHidden');
  },
});
