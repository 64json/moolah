import React, { InputHTMLAttributes, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
}

export function DateInput({ value, ...restProps }: Props) {
  const [dateFocused, setDateFocused] = useState(false);

  return (
    <input type={!value && !dateFocused ? 'text' : 'date'}
           onFocus={() => setDateFocused(true)} onBlur={() => setDateFocused(false)}
           value={value} {...restProps} />
  );
}
