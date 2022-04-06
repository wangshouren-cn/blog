import classNames from 'classnames';
import { useRouter } from 'next/router';
import React, { HTMLAttributes, useCallback } from 'react'
import styles from './index.module.css'
export interface BackProps extends HTMLAttributes<any> {
}
const Back: React.FC<BackProps> = ({ onClick, className }) => {

  const router = useRouter();

  const handleClick = useCallback(
    (e) => {
      router.back();
      onClick && onClick(e)
    },
    [onClick],
  );

  const additionClassName = {} as any;

  if (className) {
    additionClassName[className] = true
  }



  return (
    <div className={classNames(additionClassName, styles.back)} onClick={handleClick}>
      ×
    </div>
  );
}
export default Back