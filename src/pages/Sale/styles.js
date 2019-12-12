import styled, { keyframes, css } from 'styled-components';

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h1 {
    color: #4577e2;
    font-size: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: row;

  input {
    border: 1px solid #eee;
    padding: 10px 15px;
    font-size: 16px;
  }
`;
export const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  justify-content: space-between;

  button {
    padding: 10px;
    border-radius: 5px;
    border: 0;
    background: #4577e2;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: default;
  }
  button[disabled]:hover {
    opacity: 0.5;
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;

  input {
    border: 1px solid #eee;
    padding: 10px 15px;
    font-size: 16px;
  }

  div {
    display: flex;
    align-items: center;
    flex-direction: row;

    button {
      background: #d11a2a;
      border: 0;
      padding: 10px;
      border-radius: 4px;
      margin-right: 5px;

      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;

  li {
    padding: 15px 0;
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

    div a {
      margin-right: 10px;
    }

    div button {
      background: #d11a2a;
      border: 0;
      padding: 5px;
      color: #fff;
      margin-left: 10px;
      border-radius: 4px;
    }
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit',
  disabled: props.loading,
}))`
  background: #4577e2;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 2s linear infinite;
      }
    `}
`;

export const AddButton = styled.button`
  background: #4577e2;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
    color: #fff;
  }
`;
