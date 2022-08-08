import styled from "styled-components";

export const ModalAddEdit = styled.div`
  width: 940px;
  margin: 70px;
  padding: 20px 50px 50px 50px;
  position: fixed;
  z-index: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  margin-bottom: 3rem;
  background: #fff;
`;

export const IngredientsForm = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: 0.1rem solid #000;
  border-collapse: collapse;
  table {
    margin-bottom: 1rem;
    border: 0.1rem solid #000;
    border-collapse: collapse;
    td {
      border: 0.1rem solid #000;
      border-collapse: collapse;
    }
  }
`;

export const TopFormSection = styled.div`
  display: flex;
  justify-content: space-between;
  /* text-align: center; */
  flex-direction: row;
  align-items: center;
  width: 20rem;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const ImageInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  object-fit: cover;
  width: 12rem;
  border-radius: 0.4rem 0.4rem 0 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;
