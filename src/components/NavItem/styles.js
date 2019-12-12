import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: none;
    color: #444;
  }
`;

export const Item = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;

  svg {
    margin-right: 10px;
  }
`;
