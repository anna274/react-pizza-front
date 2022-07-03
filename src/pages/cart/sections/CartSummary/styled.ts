import styled from 'styled-components';

export const CartSummaryContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 40px 0;
`;

export const SummaryAmount = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 22px;
`;

export const SummaryAmountDescription = styled.p`
  margin: 0;
  font-weight: 400;
  margin-right: 5px;
`;

export const SummaryAmountNumber = styled.p`
  margin: 0;
  font-weight: 700;
`;

export const SummaryPrice = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 22px;
`;

export const SummaryPriceDescription = styled.p`
  margin: 0;
  font-weight: 400;
  margin-right: 5px;
`;

export const SummaryPriceNumber = styled.p`
  margin: 0;
  font-weight: 700;
  color: #fe5f1e;
`;
