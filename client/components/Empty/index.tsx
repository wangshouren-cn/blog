import React, { HTMLAttributes } from 'react'
import styles from './index.module.css'
export interface EmptyProps extends HTMLAttributes<any> {
}
const Empty: React.FC<EmptyProps> = (props) => {
  return <div className={styles.empty}>
    无内容
  </div>;
}
export default Empty