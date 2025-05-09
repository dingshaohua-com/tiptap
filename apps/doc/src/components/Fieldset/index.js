import styles from "./index.module.scss";
import exampleImg from '../../../static/img/example.png'
import React from 'react';

const Fieldset = ({ title = '🌰 举个例子', children }) => {
  return <div className={styles.Fieldset}>
    <div className={styles.title}>{title}</div>
    <div className={styles.content}>{children}</div>
    <img className={styles.exampleImg} src={exampleImg} alt="exampleImg" />
  </div>
}

export default Fieldset;