import styled from 'styled-components';

interface IButtonProps {
  variant?: 'contained' | 'not-bordered';
  size?: 'big';
}

export const StyledButton = styled.button`
  font-weight: 700;
  font-size: 16px;
  color: ${({ variant }: IButtonProps) => (variant === 'contained' ? '#ffffff' : '#eb5a1e')};
  background: ${({ variant }: IButtonProps) => (variant === 'contained' ? '#eb5a1e' : '#ffffff')};
  border: 1px solid #eb5a1e;
  border-radius: 30px;
  padding: ${({ size }: IButtonProps) => (size === 'big' ? '18px 24px' : '10px 15px')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #ffffff;
    background: ${({ variant }: IButtonProps) => (variant === 'contained' ? '#d15019' : '#eb5a1e')};

    & a {
      color: #ffffff;
    }
  }

  & a {
    transition: all 0.2s;
    color: ${({ variant }: IButtonProps) => (variant === 'contained' ? '#ffffff' : '#eb5a1e')};
    text-decoration: none;
  }
`;

export const StyledNotBorderedButton = styled(StyledButton)`
  border: none;
  color: #b6b6b6;
  background: transparent;

  &:hover {
    color: #b6b6b6;
    background: transparent;
  }
`;
