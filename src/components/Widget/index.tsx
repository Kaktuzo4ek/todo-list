import React from 'react';

import styles from './widget.module.scss';

const Widget: React.FC = () => (
  <div className={styles.body}>
    <div className={styles.flexBox}>
      <h3>Activity</h3>
      <span className={styles.type}>Annual</span>
    </div>
    <h2>63.200</h2>
    <div className={styles.flexBox}>
      <span className={styles.percent}>-12%</span>
      <span>Since last week</span>
    </div>
  </div>
);

export default Widget;
