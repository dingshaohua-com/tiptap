import { Node, mergeAttributes, } from "@tiptap/core";
import { TextSelection } from "prosemirror-state";

export default Node.create({
  name: "SquareInput",

  group: "inline",

  inline: true,

  draggable: true,

  selected: true,
  atom: true,
  content: "text*", //解决扩展后不能输入内容的问题

  addAttributes() {
    return {
      text: {
        default: "",
      },
    };
  },

  parseHTML() {
    // 回显转义规则
    return [
      {
        tag: "div.square-input",
      },
    ];
  },



  // renderHTML({ node }) { // 保存时候的显示
  //   console.log(222, node);
    
  //   // 保存时候的样子
  //   return [
  //     "div",
  //     {
  //       class: "square-input",
  //     },
  //     node.attrs.text || "", // 显示文本
  //   ];
  // },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    
    return ({ editor, node, view, getPos }) => {
      const wrapper = document.createElement("span");
      wrapper.className = "square-input";
      wrapper.style.width = "20px";
      wrapper.style.height = "20px";
      wrapper.style.padding = "0 3px";
      wrapper.style.border = "1px solid black";
      wrapper.style.display = "inline-block";

      const input = document.createElement("input");
      input.type = "text";
      input.style.display = "block";
      input.value = node.attrs.text;
      input.style.width = "100%";
      input.style.height = "100%";
      input.style.border = "none";
      input.style.outline = "none";
      input.style.textAlign = "center";
      input.style.padding = 0;
      input.style.margin = 0;

    
      

      // 输入框事件处理
      input.addEventListener("input", (event) => {
        // const newText = event.target.value;
        // // 更新节点属性（用于保存的时候形成 <div class="square-input"> xxx </div>）
        // // view.dispatch(view.state.tr.setNodeMarkup(getPos(), undefined, { text: newText }));
        // const tr = view.state.tr;
        // tr.setMeta("preventFocus", true);
        // tr.setNodeMarkup(getPos(), undefined, { text: newText });
        // view.dispatch(tr)
        // setTimeout(()=>{
        //   console.log('执行啦');
        //   const tr = view.state.tr;
        //   tr.setMeta("preventFocus", true);
        //   view.dispatch(tr)
        // },1000)
        // // 将光标移动到输入框末尾
        // setTimeout(()=>{
        //   input.focus();
        //   input.setSelectionRange(newText.length, newText.length);
        //   console.log(input);
        // }, 1000)
      });

      input.addEventListener("blur", (event) => {
        const newText = event.target.value;
        const pos = getPos();
        view.dispatch(
          view.state.tr.setNodeMarkup(pos, undefined, { text: newText })
        );
        
      });

      // 聚焦事件处理
      input.addEventListener("focus", () => {
        const pos = getPos();
        view.dispatch(
          view.state.tr.setSelection(TextSelection.create(view.state.doc, pos))
        );
      });

      // 确保点击方框时可以聚焦
      wrapper.addEventListener("click", () => {
        input.focus();
      });

      wrapper.appendChild(input);

      console.log(wrapper, node);
      
      return {
        dom: wrapper,
        // contentDOM: input,
      };
    };
  },

  addCommands() {
    return {
      setSquareInput:
        () =>
        ({ commands }) => {
          return commands.insertContent({ type: this.name });
        },
    };
  },
});

