import { styled } from "styled-components";
import { useAuth } from "./contexts/authContext";
import { useMessage } from "./hooks/uesMessage";
import { Button } from "./components/Button";
import { colors } from "./constants/colors";
import { SecretBox } from "./components/SecretBox";

export function AuthorizedApp() {
  const { user, signout } = useAuth();
  const { message, error, isLoading } = useMessage();

  return (
    <PageWrapper>
      <Header>
        <AddressLabel>{user?.address}</AddressLabel>
        <SingoutButton onClick={signout}>Sign out</SingoutButton>
      </Header>
      <div>
        {error && <ErrorLabel>{error}</ErrorLabel>}
        {isLoading && <LoadingLabel>Loading message</LoadingLabel>}
        {message && <SecretBox message={message} />}
      </div>
    </PageWrapper>
  );
}

const PageWrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 10,
  height: "100%",
  backgroundColor: colors.darkGrey,
  padding: 10,
});

const Header = styled.div({
  display: "flex",
  alignItems: "center",
});

const SingoutButton = styled(Button)({
  marginLeft: "auto",
});

const AddressLabel = styled.pre({
  color: colors.white,
  fontSize: 24,
});

const ErrorLabel = styled.pre({
  color: colors.red,
  fontSize: 20,
});

const LoadingLabel = styled.pre({
  color: colors.white,
  fontSize: 20,
});
