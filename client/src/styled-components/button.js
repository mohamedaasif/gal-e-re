import styled from "styled-components";

export const Button = styled.button`
  color: white;
  background: ${(props) =>
    props.primary ? "var(--primary-color)" : "var(--secondary-color)"};
  padding: 8px 12px;
  border-radius: 3px;
  border: none;
  outline: none;
  font-size: 16px;

  &:hover {
    cursor: pointer;
    background: ${(props) =>
      props.primary ? "var(--primary-hover)" : "var(--secondary-hover)"};
  }
`;
