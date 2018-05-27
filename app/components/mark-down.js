import Component from '@ember/component';
import { computed, get } from '@ember/object';
import { htmlSafe } from "@ember/string"
import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  breaks: true,
  sanitize: true,
  smartypants: true,
  headerPrefix: 'md-',
});

export default Component.extend({
  generatedHtml: computed('markdown', function() {
    return htmlSafe(marked(get(this, 'markdown') || ''));
  }),
})
.reopenClass({
  positionalParams: ['markdown'],
});
