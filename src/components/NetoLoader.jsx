import React from 'react';

export default function NetoLoader({styleName = ''}) {
  return (
    <div className={`loader ${styleName}`}>Loading...</div>
  );
};
