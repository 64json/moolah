import React, { FormEventHandler, ReactNode } from 'react';
import classes from './Modal.module.scss';
import { CSSTransition } from 'react-transition-group';
import { c } from '../../utils';
import { useEsc } from '../../hooks/useEsc';

interface Props {
  title: string;
  className?: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: FormEventHandler<any>;
}

export function Modal({ title, children, onClose, onSubmit, className, ...restProps }: Props) {
  useEsc(onClose);

  return (
    <CSSTransition
      timeout={200}
      unmountOnExit
      classNames={classes}
      {...restProps}
    >
      <form className={classes.Modal} onSubmit={onSubmit}>
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
      </form>
    </CSSTransition>
  );
}
