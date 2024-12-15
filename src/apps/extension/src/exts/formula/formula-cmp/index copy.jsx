import { NodeViewWrapper, NodeViewContent } from '@tiptap/react';
import styles from './style.scss';
import cs from 'classnames';

export default (props) => {
  const {
    node: { attrs, content },
    selected,
  } = props;
  let latexString = content.content[0]?.text;
  // const onDoubleClick = () => {
  //   props.editor.chain().focus().openFormula(latexString).run();
  // };

  return (
    <>
      <NodeViewWrapper
        className={styles.latexCmp}
        onDoubleClick={onDoubleClick}
      >
        <div
          className={cs({
            [styles.Selected]: selected,
          })}
        >
          <NodeViewContent className="node-content" contentEditable={false}>
            {latexString && (
              <span
                dangerouslySetInnerHTML={{
                  __html: (window as any).MathJax?.tex2svg(latexString, {
                    em: 12,
                    ex: 6,
                    display: false,
                  }).outerHTML,
                }}
              ></span>
            )}
          </NodeViewContent>
        </div>
      </NodeViewWrapper>
    </>
  );
};
