import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  input {
    border: 1px solid #eee;
    padding: 10px 15px;
    font-size: 16px;
  }

  span {
    margin-right: 10px;
    font-size: 16px;
  }
`;

export const Form = styled.form`
  button {
    margin-top: 30px;
    padding: 10px;
    border-radius: 5px;
    border: 0;
    background: #4577e2;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
`;

export const List = styled.ul`
  margin-top: 30px;
  list-style: none;

  li button {
    background: #d11a2a;
    border: 0;
    padding: 5px;
    margin-top: 0px;
    color: #fff;
    border-radius: 4px;
  }
  li {
    padding: 0;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #4577e2;
      text-decoration: none;
    }
  }
`;
