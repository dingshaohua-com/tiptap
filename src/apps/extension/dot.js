import { Mark, mergeAttributes } from '@tiptap/core';
import styleInject from './style-inject';

const css = `.dot {
    text-emphasis: dot; 
    text-emphasis-position: under left; 
}`;
styleInject(css);

export default Mark.create({
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