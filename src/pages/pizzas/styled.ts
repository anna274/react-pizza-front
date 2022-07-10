import styled from 'styled-components';

interface IFilterProps {
  selected: boolean;
}

export const PizzasContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 65px;
`;

export const PizzaFilters = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
`;

export const PizzaFilter = styled.div`
  background: ${({ selected }: IFilterProps) => (selected ? '#282828' : '#f9f9f9')};
  color: ${({ selected }: IFilterProps) => (selected ? '#FFFFFF' : '#2C2C2C')};
  border-radius: 30px;
  padding: 16px 24px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
`;
