import React from 'react';
import { PageHeaderContainer, PageHeaderText } from './styled';

interface IProps {
  children?: React.ReactNode;
  text: string;
}

export const PageHeader: React.FC<IProps> = ({ children, text }) => {
  return (
    <PageHeaderContainer>
      <PageHeaderText>{text}</PageHeaderText>
      {children}
    </PageHeaderContainer>
  );
};

export { PageContainer } from './styled';
