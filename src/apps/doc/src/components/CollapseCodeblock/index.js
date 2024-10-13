import CodeBlock from "@theme/CodeBlock";
import React, { useRef } from "react";
import styles from "./index.module.scss";
import collapsePng from "../../../static/img/ccollapse.png";

const CollapseCodeblock = (props) => {
  const codeBlockRef = useRef(null);
  const onClick = () => {
    const codeContent = codeBlockRef.current
      .querySelector(".theme-code-block")
      .querySelector("[class*='codeBlockContent']");
    if (codeContent.style.height === "auto") {
      codeContent.style.height = "300px";
    } else {
      codeContent.style.height = "auto";
    }
  };

  return (
    <div className={styles.CollapseCodeblock} ref={codeBlockRef}>
      <img
        className={styles.CollapsePng}
        src={collapsePng}
        alt="collapsePng"
        title="展开"
        onClick={onClick}
      />
      <CodeBlock {...props}>{props.children}</CodeBlock>
    </div>
  );
};

export default CollapseCodeblock;
