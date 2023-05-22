import { styled } from "styled-components";
import { Button } from "./components/Button";
import { useAuth } from "./contexts/authContext";
import { colors } from "./constants/colors";

export function UnauthorizedApp() {
  const { signin, isLoading, error } = useAuth();

  return (
    <PageWrapper>
      <Button onClick={signin} disabled={isLoading}>
        Sign in with Polkadot
      </Button>
      {error && <pre>{error}</pre>}
    </PageWrapper>
  );
}

const PageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
  backgroundColor: colors.darkGrey,
});
