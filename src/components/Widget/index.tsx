import React from 'react';

import styles from './widget.module.scss';

interface WidgetProps {
  title: string;
  type: string;
  price: string;
  percent: string;
  description: string;
}

const Widget: React.FC<WidgetProps> = ({
  title,
  type,
  price,
  percent,
  description,
}) => (
  <div className={styles.body}>
    <div className={styles.flexBox}>
      <h3>{title}</h3>
      <span className={styles.type}>{type}</span>
    </div>
    <h2>{price}</h2>
    <div className={styles.flexBox}>
      <span className={styles.percent}>{percent}</span>
      <span>{description}</span>
    </div>
  </div>
);

export default Widget;
