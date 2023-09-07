import React from 'react';
import PropTypes from 'prop-types';

const ButtonEffect = ({ children, disabled }) => {
  return (
    <div className='relative'>
      <span className='relative z-10'>{children}</span>
      {disabled ? null : (
        <div className='z-0'>
          <span
            className='absolute overflow-hidden h-full top-[calc(22px * -1)] bottom-[50%] -left-[22px] -right-[22px] bg-[length:100%_2px] 
            bg-gradient-to-t from-transparent brightness-125 to-brand-primary bg-[0_100%] gradient-mask-t z-0'
          />
          <span
            className='absolute overflow-hidden h-full top-[50%] bottom-[calc(44px * -1)] -left-[22px] -right-[22px] bg-[length:100%_2px] 
            bg-gradient-to-t from-transparent brightness-125 to-brand-primary bg-[0_100%] gradient-mask-b z-0'
          />
        </div>
      )}
    </div>
  );
};

ButtonEffect.propTypes = {
  /** React children  */
  children: PropTypes.element.isRequired,
  /** Determins if lines should be shown  */
  disabled: PropTypes.bool,
};

export default ButtonEffect;
