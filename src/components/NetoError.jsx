import React from 'react';

export default function NetoError({error}) {
  return (
    <div className='error'>Error: {error === null && '404 not found!'}</div>
  );
};
