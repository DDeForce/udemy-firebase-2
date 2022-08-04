import styled from "styled-components";

export const RightButton = styled.button`
  height: ${(props) => props.height || "40px"};
  background-color: ${(props) => props.color || "#d9d9d9"};
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
    background-color: ${(props) => props.colorHover || "#d2d2d2"};
  }
`;

export const MiddleButton = styled.button`
  height: 40px;
  background-color: ${(props) => props.color || "#d9d9d9"};
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
    background-color: ${(props) => props.colorHover || "#d2d2d2"};
  }
`;

export const LeftButton = styled.button`
  height: ${(props) => props.height || "40px"};
  background-color: ${(props) => props.color || "#d9d9d9"};
  border: none;
  /* color: white; */
  padding: 1px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 12px 2px;
  cursor: pointer;
  border-radius: 6px 0px 0px 6px;

  &:hover {
    background-color: ${(props) => props.colorHover || "#d2d2d2"};
  }
`;
