import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function MyMenu({ onOpen }) {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/signin");
  }

  return (
    <Menu closeOnSelect={true}>
      <MenuButton as={Button} bgColor={"primary"} leftIcon={<span className="material-symbols-outlined">menu</span>}>
        Menu
      </MenuButton>
      <MenuList bgColor={"secondary"}>
        <MenuGroup title="Client">
          <MenuItem bgColor={"secondary"} onClick={onOpen} icon={<span className="material-symbols-outlined">add</span>}>
            Ajouter
          </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Profil">
          <Link to={"/account"}>
            <MenuItem bgColor={"secondary"} icon={<span className="material-symbols-outlined">person</span>}>
              Mon compte
            </MenuItem>
          </Link>
          <MenuItem bgColor={"secondary"} textColor={"red"} onClick={() => logout()} icon={<span className="material-symbols-outlined">logout</span>}>
            Se déconnecter
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
