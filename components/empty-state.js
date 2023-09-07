import React from 'react';
import PropTypes from 'prop-types';

const EmptyState = ({ animation = 'animate-dark-fade' }) => {
  return (
    <div className='flex items-center h-[30px]'>
      <div className={`w-full h-1 rounded-full ${animation}`} />
    </div>
  );
};

EmptyState.propTypes = {
  /** The type of the animation phase */
  animation: PropTypes.string,
};

export default EmptyState;
