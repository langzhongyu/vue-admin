import { Node } from 'tiptap';

export default class Span extends Node {
  get name() {
    return 'span';
  }

  get schema() {
    return {
      attrs: {
        begin: {
          default: null,
        },
        end: {
          default: null,
        },
        style: {
          default: null,
        },
      },
      inline: true,
      content: 'text*',
      group: 'inline',
      draggable: false,
      parseDOM: [
        {
          tag: 'span',
          getAttrs(dom) {
            return { begin: dom.getAttribute('begin'), end: dom.getAttribute('end'), style: dom.getAttribute('style') };
          },
        }],
      toDOM: node => ['span', { begin: node.attrs.begin, end: node.attrs.end, style: node.attrs.style }, 0]
      ,
    };
  }
}