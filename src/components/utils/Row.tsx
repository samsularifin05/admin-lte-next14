import React from 'react';

interface props {
  className?: string;
  children?: any;
}
const Row: React.FC<props> = (props) => (
  <div className={`row ${props.className ? props.className : ''}`}>{props.children}</div>
);

export default Row;
