import styled from 'styled-components';

export const HeaderContainer = styled.header`
  padding: 30px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #f7f7f7;
`;

export const LogoContainer = styled.div`
  display: grid;
  grid-template-areas:
    'logo logo-name'
    'logo logo-description';
  grid-template-columns: 38px auto;
  column-gap: 17px;
`;

export const StyledLogo = styled.img`
  grid-area: logo;
`;

export const LogoName = styled.h1`
  grid-area: logo-name;
  font-weight: 800;
  font-size: 24px;
  text-transform: uppercase;
  margin: 0;
`;

export const LogoDescription = styled.p`
  grid-area: logo-description;
  font-weight: 400;
  font-size: 16px;
  color: #7b7b7b;
  margin: 0;
`;
