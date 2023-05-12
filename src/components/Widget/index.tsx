import React from 'react';
import classNames from 'classnames';

import styles from './widget.module.scss';

interface WidgetProps {
  title: string;
  type: string;
  price: string;
  percent: number;
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
      <span
        className={classNames(
          {
            [styles.percentRed]: percent < 0,
          },
          {
            [styles.percentGreen]: percent > 0,
          },
        )}
      >
        {`${percent > 0 ? `+ ${percent}` : percent}%`}
      </span>
      <span>{description}</span>
    </div>
  </div>
);

export default Widget;
