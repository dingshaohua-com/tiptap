import { Mark, mergeAttributes } from '@tiptap/core';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".dot {\n    text-emphasis: dot;\n    text-emphasis-position: under left;\n  }";
styleInject(css_248z);

var index = Mark.create({
    name: "dot",
    addAttributes() {
        return {
            class: {
                default: 'dot'
            },
            'data-type':{
                default: 'dot'
            }
        }
    },
    parseHTML() {
        return [
            {
                tag: 'span',
                getAttrs: element => {
                    return element.getAttribute('data-type') === 'dot';
                },
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return [
            "span",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
            0,
        ];
    },

    addCommands() {
        return {
            setDot: () => ({ commands }) => {
                return commands.setMark(this.name);
            },
            toggleDot: () => ({ commands }) => {
                return commands.toggleMark(this.name);
            },
            unsetDot: () => ({ commands }) => {
                return commands.unsetMark(this.name);
            },
        };
    }
});

export { index as default };