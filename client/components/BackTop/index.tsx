import React, { HTMLAttributes, useCallback, useEffect, useState } from 'react'
import getWindowScrollY from '../../utils/getWindowScrollY';
import useThrottle from '../../utils/useThrottle';
import Icon from '../Icon';
import styles from './index.module.css'
export interface BackTopProps extends HTMLAttributes<any> {
}
const BackTop: React.FC<BackTopProps> = (props) => {

  const [visible, setVisible] = useState(false);

  const handleClick = useCallback(
    () => {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    },
    [],
  );

  useEffect(useThrottle(() => {

    let lastVisible = visible;

    const handler = () => {

      const scrollY = getWindowScrollY();

      if (!lastVisible && scrollY > 0) {
        lastVisible = true
        setVisible(true);
      } else if (lastVisible && scrollY === 0) {
        lastVisible = false
        setVisible(false);
      }

    }

    window.addEventListener("scroll", handler)

    return () => {
      window.removeEventListener("scroll", handler);
    }
  }, []), []);
  return visible ? <Icon onClick={handleClick} className={styles.backTop} type="icon-back-top" /> : null
}
export default BackTop