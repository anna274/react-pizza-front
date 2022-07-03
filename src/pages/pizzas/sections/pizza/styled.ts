import styled from 'styled-components';

interface IModificationProps {
  selected: boolean;
}

export const PizzaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 260px;
`;

export const PizzaImage = styled.img`
  height: 260px;
  width: auto;
  margin-bottom: 10px;
`;

export const PizzaName = styled.h3`
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.01em;
  text-align: center;
`;

export const ModificationsContainer = styled.div`
  border-radius: 10px;
  background: #f3f3f3;
  margin-bottom: 17px;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 5px;
  gap: 5px;
  box-sizing: border-box;
`;

export const ModificationsGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

export const Modification = styled.button`
  flex: 1;
  background: ${({ selected }: IModificationProps) => (selected ? '#FFFFFF' : 'none')};
  box-shadow: ${({ selected }: IModificationProps) =>
    selected ? '0px 2px 4px rgba(0, 0, 0, 0.04)' : 'none'};
  border-radius: 5px;
  border-color: #0000;
  cursor: pointer;
  padding: 5px 0;
  font-weight: 700;
  transition: all 0.2s;

  &:hover {
    background: ${({ selected }: IModificationProps) => (selected ? '#FFFFFF' : '#FFFFFF')};
  }
`;

export const PizzaFooter = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PizzaPrice = styled.h5`
  font-weight: 700;
  font-size: 22px;
  margin: 0;
  padding-left: 5px;
`;
