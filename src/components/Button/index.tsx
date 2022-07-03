import React from 'react';
import { StyledButton, StyledNotBorderedButton } from './styled';

interface IProps {
  variant?: 'contained' | 'not-bordered';
  size?: 'big';
  children: React.ReactNode;
  onClick: (args: any) => void;
  disabled?: boolean;
}

export const Button: React.FC<IProps> = ({ children, onClick, variant, size, disabled }) => {
  if (variant === 'not-bordered') {
    return (
      <StyledNotBorderedButton disabled={disabled} onClick={onClick} size={size}>
        {children}
      </StyledNotBorderedButton>
    );
  }
  return (
    <StyledButton disabled={disabled} variant={variant} onClick={onClick} size={size}>
      {children}
    </StyledButton>
  );
};
