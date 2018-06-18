import Component from '@ember/component';

export default Component.extend({
  classNames: ['preco-logo'],
  attributeBindings: ['xmlns', 'viewBox', 'xmlns\:xlink'],
  tagName: 'svg',
  xmlns: "http://www.w3.org/2000/svg",
  'xmlns:xlink': "http://www.w3.org/1999/xlink",
  viewBox: "0 0 98 98",
  theme: 'color',
})
.reopenClass({
  positionalParams: ['theme'],
});
