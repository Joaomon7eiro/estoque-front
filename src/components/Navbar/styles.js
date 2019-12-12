import styled from 'styled-components';

export const Container = styled.div`
  height: 100px;
  background: #fff;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0 10px 8px -2px #ededed;

  padding: 0 15px 0 15px;

  div {
    display: flex;
    flex-direction: row;
  }
`;
