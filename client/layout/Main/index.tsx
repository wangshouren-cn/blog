import type { NextPage } from "next";
import styles from './index.module.css'
const Main: NextPage = ({ children }) => {
  return <main className={styles.main}>{children}</main>;
};

export default Main;
