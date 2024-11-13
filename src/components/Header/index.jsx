import { api } from "../../services/api";
import { RiShutDownLine } from "react-icons/ri";
import { useAuth } from "../../hooks/auth";
import { Container, Profile, Logout } from "./styles";
import avatarPlaceholders from "../../assets/avatar_placeholder.svg";
import { useNavigate } from "react-router-dom";

export function Header() {
  const { signOut, user } = useAuth();
  const navigation = useNavigate();

  function handleSgnOut() {
    signOut();
    navigation("/");
  }

  const avatarUrl = user.avatar
    ? `${api.defaults.baseURL}/files/${user.avatar}`
    : avatarPlaceholders;
  return (
    <Container>
      <Profile to="Profile">
        <img src={avatarUrl} alt={user.name} />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong>
        </div>
      </Profile>

      <Logout onClick={handleSgnOut}>
        <RiShutDownLine />
      </Logout>
    </Container>
  );
}
