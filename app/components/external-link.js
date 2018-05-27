import Component from '@ember/component';

export default Component.extend({
  tagName: 'a',
  classNames: ['external-link'],
  attributeBindings: [
    'target',
    'href',
  ],
  target: '_blank',
})
.reopenClass({
  positionalParams: ['href'],
});
