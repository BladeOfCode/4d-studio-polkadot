import { AuthorizedApp } from "./AuthorizedApp";
import { UnauthorizedApp } from "./UnauthorizedApp";
import { useAuth } from "./contexts/authContext";

function App() {
  const { user } = useAuth();

  return user ? <AuthorizedApp /> : <UnauthorizedApp />;
}

export default App;
