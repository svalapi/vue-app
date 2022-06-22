
import RichTextRenderer from 'contentful-rich-text-vue-renderer';

export default {
  name: 'comp-paragraph',
  props: ['data'],
  components:{
    RichTextRenderer
  }
};
