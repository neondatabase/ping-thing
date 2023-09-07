import React from 'react';
import PropTypes from 'prop-types';

const LoadingDots = ({ className }) => {
  const dots = new Array(3).fill('');

  return (
    <div className='flex gap-2'>
      {dots.map((_, index) => {
        return (
          <div
            key={index}
            className={`w-2 h-2 rounded-full bg-brand-background animate-bloop ${className}`}
            style={{
              animationDelay: `${index}50ms`,
            }}
          />
        );
      })}
    </div>
  );
};

LoadingDots.propTypes = {
  /** CSS classes  */
  className: PropTypes.string,
};

export default LoadingDots;
