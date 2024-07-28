import { useTranslation } from "react-i18next";
import Section from "../UI_kit/Section";
import Style from "../styles/menu/Menu/Menu.module.css";
import MenuList from "./MenuList";

const Menu = () => {
  const [t] = useTranslation();
  return (
    <>
    <nav className={Style.onmobile}>
      <MenuList />
    </nav>
      <main className={Style.main_pc}>
        <Section>{t("choice_game")}</Section>
      </main>
    </>
  );
};

export default Menu;
