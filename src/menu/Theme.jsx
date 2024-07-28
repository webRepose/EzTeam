import Style from "../styles/menu/Theme/Theme.module.css";
import { useState } from "react";

const Theme = () => {
  const htmlDOM = document.querySelector("html");
  if (window.localStorage.getItem("theme") == null) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      window.localStorage.setItem("theme", "dark");
      htmlDOM.classList.add("dark");
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      htmlDOM.classList.add("light");
      window.localStorage.setItem("theme", "light");
    }
  }

  if (window.localStorage.getItem("theme") === "dark") {
    htmlDOM.classList.add("dark");
    htmlDOM.classList.remove("light");
    window.localStorage.setItem("theme", "dark");
  } else {
    htmlDOM.classList.add("light");
    htmlDOM.classList.remove("dark");
    window.localStorage.setItem("theme", "light");
  }

  let forState;
  if (localStorage.getItem("theme") === "light") forState = true;
  else forState = false;

  const [pressTheme, setPressTheme] = useState(forState);

  const switchTheme = () => {
    setPressTheme((prev) => !prev);
    if (htmlDOM.classList.contains("dark")) {
      htmlDOM.classList.add("light");
      htmlDOM.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
    } else {
      htmlDOM.classList.add("dark");
      htmlDOM.classList.remove("light");
      window.localStorage.setItem("theme", "dark");
    }
  };

  return (
    <label htmlFor="theme" className={Style.theme}>
      <span className={Style.theme__toggle_wrap}>
        <input
          onClick={switchTheme}
          id="theme"
          className={Style.theme__toggle}
          checked={pressTheme ? "" : "checked"}
          type="checkbox"
          readOnly
          role="switch"
          name="theme"
          value="dark"
        />
        <span className={Style.theme__fill}></span>
        <span className={Style.theme__icon}>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
          <span className={Style.theme__icon_part}></span>
        </span>
      </span>
    </label>
  );
};

export default Theme;
