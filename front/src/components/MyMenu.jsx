import { Button, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList } from "@chakra-ui/react";

// eslint-disable-next-line react/prop-types
export default function MyMenu({ onOpen }) {
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
          <MenuItem bgColor={"secondary"} icon={<span className="material-symbols-outlined">person</span>}>
            Mon compte
          </MenuItem>
          <MenuItem bgColor={"secondary"} textColor={"red"} icon={<span className="material-symbols-outlined">logout</span>}>
            Se déconnecter
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  );
}
