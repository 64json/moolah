import React, { ReactNode } from 'react';
import classes from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import { c } from '../../utils';

interface Props {
  title: string;
  className?: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, children, onClose, className, ...restProps }: Props) {
  return (
    <CSSTransition
      timeout={200}
      unmountOnExit
      classNames={classes}
      {...restProps}
    >
      <div className={classes.Modal}>
        <div className={classes.header}>
          <div className={classes.spacing}>
            <div className={classes.button} onClick={onClose}>
              Cancel
            </div>
          </div>
          <div className={classes.title}>
            {title}
          </div>
          <div className={classes.spacing} />
        </div>
        <div className={c(classes.content, className)}>
          {children}
        </div>
      </div>
    </CSSTransition>
  );
}
