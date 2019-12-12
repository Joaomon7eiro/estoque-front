import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  svg {
    animation: ${rotate} 2s linear infinite;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;

  svg {
    animation: ${rotate} 2s linear infinite;
  }

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
