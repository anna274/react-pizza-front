import styled from 'styled-components';

export const OrderedPizzaContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 30px 0;
  border-top: 1px solid #f4f4f4;

  & > * {
    flex: 1;
  }
`;

export const PizzaImage = styled.img`
  width: 80px;
  height: auto;
  margin-right: 15px;
  flex: none;
`;

export const PizzaInfo = styled.div`
  width: 280px;
  height: auto;
  margin-right: 68px;
`;

export const PizzaName = styled.h3`
  font-weight: 700;
  font-size: 22px;
  margin: 0;
`;

export const PizzaModification = styled.p`
  font-weight: 400;
  font-size: 18px;
  color: #8d8d8d;
  margin: 0;
`;

export const PizzaPrice = styled.h5`
  font-weight: 700;
  font-size: 22px;
  margin: 0;
  padding-left: 5px;
  flex: 1;
`;

export const PizzaRemoveButton = styled.button`
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 2px solid #d7d7d7;
  border-radius: 50%;
  color: #d7d7d7;
  font-size: 22px;
  flex: none;
  cursor: pointer;
`;
