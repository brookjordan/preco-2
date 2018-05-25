import InlineSVG from '../components/inline-svg';

export default InlineSVG.extend({
  icon: null,

  viewBox: '0 0 32 32',
  classNames: ['svg-icon'],
})
.reopenClass({
  positionalParams: ['icon'],
});
