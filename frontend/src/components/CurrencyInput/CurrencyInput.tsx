import React, { useRef } from 'react';
import classes from './CurrencyInput.module.scss';
import { c } from '../../utils';
import ContentEditable from 'react-contenteditable';

interface Props {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

export function CurrencyInput({ className, value, onChange }: Props) {
  const inputRef = useRef<HTMLDivElement>(null);

  return (
    <label className={c(classes.CurrencyInput, className)} onBlur={() => onChange((+value).toFixed(2) || '0.00')}
           onClick={() => {
             const div = inputRef.current;
             const sel = window.getSelection();
             if (!div || !sel) return;
             const range = document.createRange();
             range.selectNodeContents(div);
             sel.removeAllRanges();
             sel.addRange(range);
           }}>
      <div className={classes.currency}>
        $
      </div>
      <ContentEditable className={classes.amount}
                       innerRef={inputRef}
                       html={value.replace(/[^\d.]/g, '')}
                       onChange={e => onChange(e.target.value)} />
    </label>
  );
}
