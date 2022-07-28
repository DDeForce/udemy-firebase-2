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

export const LogoutButton = styled.button`
  height: 40px;
  background-color: #d9d9d9;
  border: none;
  /* color: white; */
  padding: 1px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 12px 2px;
  cursor: pointer;
  border-radius: 0px 6px 6px 0px;

  &:hover {
    background-color: #d2d2d2;
  }
`;

export const LoginButton = styled.button`
  height: 40px;
  background-color: #d9d9d9;
  border: none;
  /* color: white; */
  padding: 1px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 12px 2px;
  cursor: pointer;

  &:hover {
    background-color: #d2d2d2;
  }
`;

export const ResetPassButton = styled.button`
  height: 40px;
  background-color: #d9d9d9;
  border: none;
  /* color: white; */
  padding: 1px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 12px 2px;
  cursor: pointer;
  border-radius: 0px 6px 6px 0px;

  &:hover {
    background-color: #d2d2d2;
  }
`;
