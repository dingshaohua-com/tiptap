import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import { useRef } from 'react';
import * as styles from './style.css';


const ImgCmp = (props) => {
  const imgRef = useRef();
  const {
    node: { attrs, content },
    selected,
  } = props;

  const handleUp = () => {
    imgRef.current.onmousemove = null;
    imgRef.current.onmousedown = null;
  };
  const handleDown = (edown) => {
    var node = imgRef.current;
    var xNum = edown.clientX - node.offsetWidth;
    node.onmousemove = function (eMove) {
      node.width = eMove.clientX - xNum;
      attrs.width = eMove.clientX - xNum;
    };
  };

  return (
    <>
      <NodeViewWrapper className={styles.ImgCmp}>
        <div
          className={selected?styles.Selected:''}
        >
          <NodeViewContent className="node-content" contentEditable={false}>
            <img
              {...attrs}
              alt="img"
              ref={imgRef}
              onMouseUp={handleUp}
              onMouseDown={(e) => {
                selected && handleDown(e);
              }}
            />
          </NodeViewContent>
        </div>
      </NodeViewWrapper>
    </>
  );
};

export default ImgCmp;
