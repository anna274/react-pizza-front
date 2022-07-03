import styled from 'styled-components';

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const AmountButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid #fe5f1e;
  color: #fe5f1e;
  font-size: 22px;
  cursor: pointer;
`;

export const AmountNumber = styled.p`
  margin: 0;
  width: 38px;
  font-weight: 700;
  font-size: 22px;
  text-align: center;
`;
