import { auth } from "../index";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Login from "./Login";
import Style from "../styles/components/navbar/navbar.module.css";
import MenuList from "../menu/MenuList";
import Theme from "../menu/Theme";
import Lang from "../menu/Lang";
import LangAbsolute from "../menu/LangAbsolute";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [t] = useTranslation();
  const [lang, setLang] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [login, setLogin] = useState(false);
  const signBtnRef = useRef(null);

  const setMenu = () => {
    setUserMenu((prev) => !prev);
  };

  const signOut = () => {
    const resExit = window.confirm(t("really_ex"));
    resExit && auth.signOut();
    setUserMenu((prev) => !prev);
    setLogin((prev) => (prev = false));
  };

  const signIn = () => {
    setLogin((prev) => (prev = true));
  };

  useEffect(() => {
    window.addEventListener("keyup", (e) => {
      if (e.key === "Escape") setUserMenu((prev) => (prev = false));
    });
  }, []);

  return (
    <>
      <header className={Style.header}>
        <Link
          to={"/"}
        >
          <img
            className={Style.header_logo}
            src="../../img/Navbar/logo1.svg"
            width={130}
            alt="logo"
          />
        </Link>
        <Theme />
        <Lang setLang={setLang} />
        {user ? (
          <button onClick={setMenu} className={Style.header_ava}>
            {<img width={37} src={user.photoURL} alt="ava" />}
          </button>
        ) : (
          <button
            ref={signBtnRef}
            className={Style.header_signin}
            onClick={signIn}
          >
            <i
              style={{ marginRight: "10px" }}
              className="fa-solid fa-right-to-bracket"
            ></i>
            <b>{t("signin")}</b>
          </button>
        )}

        {userMenu && (
          <nav className={Style.header_user}>
            <ul>
              <li>
                <Link
                  onClick={() => setUserMenu((prev) => !prev)}
                  to="/profile"
                >
                  <button>
                    <i className="fa-solid fa-user"></i> {t("profile")}
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={signOut}>
                  <i className="fa-solid fa-right-from-bracket"></i> {t("exit")}
                </button>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <aside className={Style.menu_aside}>
        <MenuList />
      </aside>
      {lang && <LangAbsolute setLang={setLang} />}
      {login && !user && <Login setLogin={setLogin} btnRef={signBtnRef} />}
    </>
  );
};

export default Navbar;
