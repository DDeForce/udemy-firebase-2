import styled from "styled-components";

export const LoginFormContainer = styled.div`
  margin-right: 20px;

  form {
    position: relative;
    top: 50%;
    transform: translate(0%, -50%);
    display: flex;
    flex-direction: row;
    gap: 10px;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
    }
    label {
      display: flex;
      align-items: center;
      input {
        border: none;
      }
    }
  }
`;

export const Row = styled.div`
  position: relative;
  top: 50%;
  transform: translate(0%, -50%);
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
