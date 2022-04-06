import React from "react";
import Icon from "../Icon";
import styles from './index.module.css'
export interface LoadingProps extends React.HTMLAttributes<any> {
  loading: boolean;
}
const Loading: React.FC<LoadingProps> = ({ loading, children, ...props }) => {
  return loading ? <div className={styles.loadingBox}><Icon className={styles.loading} type="icon-icloading" {...props} /></div> : <>{children}</>;
};
export default Loading;
