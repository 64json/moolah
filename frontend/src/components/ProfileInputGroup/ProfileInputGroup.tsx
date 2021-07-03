import React, { useState } from 'react';
import classes from './ProfileInputGroup.module.scss';
import { c } from '../../utils';

export interface UserDto {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  dob: string;
  country: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  zip: string;
}

interface Props {
  className?: string;
  value: UserDto;
  onChange: (value: UserDto) => void;
  error: boolean;
  modify?: boolean;
}

export function ProfileInputGroup({ className, value, onChange, error, modify }: Props) {
  const [dateFocused, setDateFocused] = useState(false);

  const {
    firstName,
    lastName,
    email,
    password,
    oldPassword,
    newPassword,
    dob,
    country,
    line1,
    line2,
    city,
    state,
    zip,
  } = value;

  return (
    <div className={c(classes.ProfileInputGroup, error && classes.error, className)}>
      <div className={classes.row}>
        <input type="text" placeholder="First Name" className={classes.input}
               value={firstName} onChange={e => onChange({ ...value, firstName: e.target.value })} />
        <input type="text" placeholder="Last Name" className={classes.input}
               value={lastName} onChange={e => onChange({ ...value, lastName: e.target.value })} />
      </div>
      <input type="email" placeholder="Email" className={classes.input}
             value={email} onChange={e => onChange({ ...value, email: e.target.value })} />
      {
        modify ?
          <>
            <input type="password" placeholder="Old Password" className={classes.input}
                   value={oldPassword} onChange={e => onChange({ ...value, oldPassword: e.target.value })} />
            <input type="password" placeholder="New Password" className={classes.input}
                   value={newPassword} onChange={e => onChange({ ...value, newPassword: e.target.value })} />
          </> :
          <input type="password" placeholder="Password" className={classes.input}
                 value={password} onChange={e => onChange({ ...value, password: e.target.value })} />
      }
      <input type={!dob && !dateFocused ? 'text' : 'date'} placeholder="Date of Birth" className={classes.input}
             onFocus={() => setDateFocused(true)} onBlur={() => setDateFocused(false)}
             value={dob} onChange={e => onChange({ ...value, dob: e.target.value })} />
      <select className={classes.input}
              value={country} onChange={e => onChange({ ...value, country: e.target.value })}>
        <option value="IL">🇮🇱 Israel</option>
        <option value="MX">🇲🇽 Mexico</option>
        <option value="NL">🇳🇱 Netherlands</option>
        <option value="SG">🇸🇬 Singapore</option>
        <option value="UK">🇬🇧 United Kingdom</option>
        <option value="US">🇺🇸 United States</option>
      </select>
      <input type="text" placeholder="Address Line 1" className={classes.input}
             value={line1} onChange={e => onChange({ ...value, line1: e.target.value })} />
      <input type="text" placeholder="Address Line 2" className={classes.input}
             value={line2} onChange={e => onChange({ ...value, line2: e.target.value })} />
      <div className={classes.row}>
        <input type="text" placeholder="City" className={classes.input}
               value={city} onChange={e => onChange({ ...value, city: e.target.value })} />
        {
          country === 'US' &&
          <input type="text" placeholder="State" className={classes.input}
                 style={{ minWidth: 64, flex: 0 }}
                 value={state} onChange={e => onChange({ ...value, state: e.target.value })} />
        }
        <input type="text" placeholder="Zip" className={classes.input}
               style={{ minWidth: 76, flex: 0 }}
               value={zip} onChange={e => onChange({ ...value, zip: e.target.value })} />
      </div>
    </div>
  );
}
