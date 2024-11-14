import { isNodeSelection, mergeAttributes, Node } from "@tiptap/core";
import { NodeSelection, TextSelection } from "@tiptap/pm/state";
import styleInject from "../../utils/style-inject";

const css = `.circle-ipt {
    border: 1px solid #000000;
    border-radius: 50%;
    width: 26px;
    height: 26px;
    font-size: 12px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    overflow: hidden;

   
};`;
styleInject(css);

export default Node.create({
  name: "circle-ipt",
  //   group: 'block',  // 分组
  //   selectable: true,
  //   draggable: true,
  inline: true,
  //   atom: true,
  //   content: "inline*",
  addAttributes() {
    return {
      class: {
        default: "circle-ipt",
      },
    };
  },

  addOptions() {
    return {
      //   exitOnTripleEnter: true,
      //   exitOnArrowDown: true,
      //   defaultLanguage: null,
      HTMLAttributes: {},
    };
  },

  group: "block",

  //   parseHTML() {
  //     return [{ tag: "hr" }];
  //   },

  parseHTML() {
    return [
      {
        tag: "span",
        getAttrs: (element) => {
          return element.getAttribute("class") === "circle-ipt";
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
    //     return [
    //         'span',
    //         mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    //         [
    //           'span',
    //           {
    //             class: null
    //           },
    //           0,
    //         ],
    //       ]
  },

  addCommands() {
    return {
      setCircleIpt:
        () =>
        ({ chain, state }) => {
          const { selection } = state;
          const { $from: $originFrom, $to: $originTo } = selection;

          const currentChain = chain();

          if ($originFrom.parentOffset === 0) {
            currentChain.insertContentAt(
              {
                from: Math.max($originFrom.pos - 1, 0),
                to: $originTo.pos,
              },
              {
                type: this.name,
              }
            );
          } else if (isNodeSelection(selection)) {
            currentChain.insertContentAt($originTo.pos, {
              type: this.name,
            });
          } else {
            currentChain.insertContent({ type: this.name });
          }

          return (
            currentChain
              // set cursor after horizontal rule
              .command(({ tr, dispatch }) => {
                if (dispatch) {
                  const { $to } = tr.selection;
                  const posAfter = $to.end();

                  if ($to.nodeAfter) {
                    if ($to.nodeAfter.isTextblock) {
                      tr.setSelection(
                        TextSelection.create(tr.doc, $to.pos + 1)
                      );
                    } else if ($to.nodeAfter.isBlock) {
                      tr.setSelection(NodeSelection.create(tr.doc, $to.pos));
                    } else {
                      tr.setSelection(TextSelection.create(tr.doc, $to.pos));
                    }
                  } else {
                    // add node after horizontal rule if it’s the end of the document
                    const node =
                      $to.parent.type.contentMatch.defaultType?.create();

                    if (node) {
                      tr.insert(posAfter, node);
                      tr.setSelection(
                        TextSelection.create(tr.doc, posAfter + 1)
                      );
                    }
                  }

                  tr.scrollIntoView();
                }

                return true;
              })
              .run()
          );
        },
    };
  },
});
