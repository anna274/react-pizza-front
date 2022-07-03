import styled from 'styled-components';

export const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 550px;
  margin: auto;
  margin-top: 20px;
`;

export const EmptyCartHeader = styled.h2`
  font-weight: 700;
  font-size: 32px;
  margin: 0;
  margin-bottom: 10px;
`;

export const EmptyCartDescription = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: #777777;
  margin: 0;
  margin-bottom: 20px;
  text-align: center;
`;

export const EmptyCartImage = styled.img`
  margin-bottom: 70px;
  width: 280px;
  height: auto;
`;
