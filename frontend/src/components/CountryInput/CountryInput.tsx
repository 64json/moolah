import React, { SelectHTMLAttributes } from 'react';
import classes from '../ProfileInputGroup/ProfileInputGroup.module.scss';
import { c } from '../../utils';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
}

export function CountryInput({ className, ...restProps }: Props) {
  return (
    <select className={c(classes.input, className)} {...restProps}>
      <option value="IL">🇮🇱 Israel</option>
      <option value="MX">🇲🇽 Mexico</option>
      <option value="NL">🇳🇱 Netherlands</option>
      <option value="SG">🇸🇬 Singapore</option>
      <option value="GB">🇬🇧 United Kingdom</option>
      <option value="US">🇺🇸 United States</option>
    </select>
  );
}
