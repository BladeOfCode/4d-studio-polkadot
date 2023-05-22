import { styled } from "styled-components";
import { colors } from "../constants/colors";

export const Button = styled.button({
  padding: "12px 24px",
  borderRadius: 8,
  color: colors.white,
  backgroundColor: colors.black,
  cursor: "pointer",
  fontSize: 24,
  border: "none",
  outline: "none",
});
