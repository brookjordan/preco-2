import Component from '@ember/component';

export default Component.extend({
  tagName: 'svg',
  classNames: ['inline-svg'],
  attributeBindings: ['xmlns', 'viewBox'],
  xmlns: 'http://www.w3.org/2000/svg',
});
