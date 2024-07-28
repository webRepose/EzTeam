import Style from "../styles/menu/Lang/Lang.module.css";
import { useTranslation } from "react-i18next";

const Lang = ({ setLang }) => {
  const [t] = useTranslation();

  return (
    <section className={Style.outLang}>
      <button
        title={"Сменить язык"}
        className={Style.lang}
        onClick={() => {
          setLang((prev) => !prev);
        }}
      >
        <p>
          <i className="fa-solid fa-language"></i>
          <b>{t("Lang")}</b>
        </p>
      </button>
    </section>
  );
};

export default Lang;
