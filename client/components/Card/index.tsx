import React, { HTMLAttributes } from "react";
import styles from "./index.module.css";
import classnames from "classnames";
export interface CardProps extends HTMLAttributes<any> { }
const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <section className={classnames(styles.card, className)} {...props}>
      {children}
    </section>
  );
};
export default Card;
