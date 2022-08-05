import styled from "styled-components";

export const ImageUploadPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  color: red;
  /* object-fit: cover;
  width: 12rem;
  border-radius: 0.4rem 0.4rem 0 0; */
`;

export const ImagePreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  margin: 20px;

  img {
    object-fit: cover;
    width: 12rem;
    border-radius: 0.4rem 0.4rem 0 0;
  }

  button {
    height: 28px;
    width: 12rem;
    background-color: #ffc700;
    border: none;
    padding: 0px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    &:hover {
      background-color: #d1a301;
    }
  }
`;

export const ImageButton = styled.input`
  height: 28px;
  background-color: #ffc700;
  border: none;
  padding: 0px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;

  &:hover {
    background-color: #d1a301;
  }
`;

export const InputImage = styled.input``;
