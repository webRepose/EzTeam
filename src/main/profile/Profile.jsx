import { useTranslation } from "react-i18next";
import { useAuthState } from "react-firebase-hooks/auth";
import { orderBy, collection, query, doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../..";
import { useCollectionData } from "react-firebase-hooks/firestore";
import DateFun from "../../components/DateFun";
import Section from "../../UI_kit/Section";
import StyleP from "../../styles/main/profile/profile.module.css";
import Style from "../../styles/main/pubg/pubg.module.css";
import { Link } from "react-router-dom";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [t] = useTranslation();
  const [cards] = useCollectionData(
    query(
      collection(db, "users", user.uid, "cards"),
      orderBy("createdAt", "desc")
    )
  );

  const deleteCard = async (e) => {
    const idDoc = e.currentTarget.id;
    const game = e.currentTarget.name;
    console.log(game);
    const resExit = window.confirm(t("really_del"));
    if (resExit) {
      await deleteDoc(doc(db, game, idDoc));
      await deleteDoc(doc(db, "users", user.uid, "cards", idDoc));
    }
  };

  return (
    <main>
      <Section>
        <div className={StyleP.profile}>
          <h3 style={{ marginTop: "50px" }}>{t("profile")}</h3>
          {cards && cards.length >= 1 ? (
            <div>
              <h4 style={{ marginLeft: "20px" }}>{t("tickets")}</h4>
              <div style={{ paddingTop: "20px" }} className={Style.game_cards}>
                {cards.map((data, id) => (
                  <div className={Style.game_cards_block} key={id}>
                    <button
                      id={data.uncal}
                      name={data.game}
                      onClick={deleteCard}
                      className={StyleP.profile_delete}
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <div className={Style.game_cards_block__first}>
                      <img width={60} src={data.ava} alt="ava" />
                      <div>
                        <p>
                          <i className="fa-solid fa-magnifying-glass"></i>{" "}
                          {t("team_fing")}
                        </p>
                        <em>{data.name}</em>
                        <em style={{ marginLeft: "15px" }}>
                          {DateFun(data.createdAt)}
                        </em>
                      </div>
                    </div>

                    <div className={Style.game_cards_block__stick}></div>
                    <div className={Style.game_cards_block__second}>
                      <div className={Style.game_cards_block__second_block}>
                        <div>
                          <img
                            width={25}
                            src={`../img/Header/${data.region}.png`}
                            alt="flag"
                          />
                          <p>{t(data.region)}</p>
                        </div>
                        <p style={{ marginTop: "5px" }}>
                          <i className="fa-solid fa-globe"></i>
                          {data.lang}
                        </p>
                      </div>
                      <div className={Style.game_cards_block__second_block}>
                        <p>
                          <i className="fa-solid fa-trophy"></i>
                          {data.rang}
                        </p>
                        <p style={{ marginTop: "10px" }}>{data.game}</p>
                      </div>
                    </div>
                    <div
                      style={{ marginTop: "10px" }}
                      className={Style.game_cards_block__second}
                    >
                      {t("contacts")}
                      {data.discord && (
                        <a rel="noreferrer" target="_blank" href={data.discord}>
                          <button style={{ backgroundColor: "#6165f2" }}>
                            Discord
                          </button>
                        </a>
                      )}
                      {data.tg && (
                        <a rel="noreferrer" target="_blank" href={data.tg}>
                          <button style={{ backgroundColor: "#1fafe1" }}>
                            Telegram
                          </button>
                        </a>
                      )}
                      {data.vk && (
                        <a rel="noreferrer" target="_blank" href={data.vk}>
                          <button style={{ backgroundColor: "#0F7FFE" }}>
                            Vk
                          </button>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height: "75svh" }} className={Style.empty}>
              <div className={Style.empty_block}>
                <h3>{t("empty")}</h3>
                <Link to={"/pubg"}>
                  <button>{t("find_card")}</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Section>
    </main>
  );
};

export default Profile;
