import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import DIRECTORY_DATA from './directory.data';
import './directory.styles.scss';

const Directory = ({ sections }) => (
  <div className='directory-menu'>
    {DIRECTORY_DATA.map(({ id, ...otherSectionProps }) => (
      <MenuItem key={id} {...otherSectionProps} />
    ))}
  </div>
);

export default Directory;
