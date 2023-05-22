import { styled } from "styled-components";
import { colors } from "../constants/colors";

export function SecretBox({ message }: { message: string }) {
  return (
    <Wrapper>
      <Title>Secret</Title>
      <Content>{message}</Content>
    </Wrapper>
  );
}

const Wrapper = styled.div({
  color: colors.white,
  fontSize: 20,
  backgroundColor: colors.black,
  padding: 10,
  borderRadius: 8,
});

const Content = styled.pre({
  textAlign: "center",
  overflowWrap: "anywhere",
  whiteSpace: "pre-wrap",
});

const Title = styled.h2({
  textAlign: "center",
});
