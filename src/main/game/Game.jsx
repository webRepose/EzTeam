import { useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../..";
import DateFun from "../../components/DateFun";
import {
  Timestamp,
  orderBy,
  collection,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../..";
import { useTranslation } from "react-i18next";
import Login from "../../components/Login";
import Section from "../../UI_kit/Section";
import Style from "../../styles/main/pubg/pubg.module.css";
import ModalClose from "../../components/modalClose";

const Game = ({ nameGame, arrayRank }) => {
  const [user] = useAuthState(auth);
  const [cards] = useCollectionData(
    query(collection(db, nameGame), orderBy("createdAt", "desc"))
  );
  const [t] = useTranslation();
  const [cardStatus, setCardStatus] = useState(false);
  const cardRef = useRef(null);
  const card2Ref = useRef(null);
  const cardBtnRef = useRef(null);
  const [checkLogin, setCheckLogin] = useState(false);
  const [burger, setBurger] = useState(false);
  const [filtr, setFiltr] = useState("All");
  const [uidDoc] = useState(
    user &&
      user.uid[Math.floor(Math.random() * 10)] +
        user.uid[Math.floor(Math.random() * 10)] +
        user.uid[Math.floor(Math.random() * 10)] +
        user.displayName[3] +
        user.photoURL[15] +
        Math.floor(Math.random() * 1000)
  );
  const rangs = arrayRank;
  const [cardData, setCardData] = useState({
    uid: user && user.uid,
    discord: "",
    tg: "",
    vk: "",
    name: user && user.displayName,
    ava: user && user.photoURL,
    rang: user && rangs[0],
    lang: "Русский",
    region: "Kazakhstan",
    uncal: user && uidDoc,
    game: nameGame,
  });

  const createCard = () => {
    if (user) {
      setCardStatus((prev) => !prev);
    } else {
      setCheckLogin((prev) => (prev = true));
    }
  };

  const Send = async () => {
    if ((cardData.discord || cardData.tg || cardData.vk) === "") {
      alert(t("checkContacts"));
      return false;
    }
    if (
      cardData.discord !== "" &&
      !cardData.discord.includes("https://discord.gg/")
    ) {
      alert(t("checkDs"));
      return false;
    }
    if (cardData.tg !== "" && !cardData.tg.includes("https://t.me/")) {
      alert(t("checkTg"));
      return false;
    }
    if (cardData.vk !== "" && !cardData.vk.includes("https://vk.com/")) {
      alert(t("checkVk"));
      return false;
    }

    await setDoc(doc(db, nameGame, uidDoc), {
      ...cardData,
      createdAt: Timestamp.fromDate(new Date()),
    });

    await setDoc(doc(db, "users", user.uid, "cards", uidDoc), {
      ...cardData,
      createdAt: Timestamp.fromDate(new Date()),
    });

    setCardStatus((prev) => (prev = false));
    setCardData({
      uid: user && user.uid,
      discord: "",
      tg: "",
      vk: "",
      name: user && user.displayName,
      ava: user && user.photoURL,
      rang: user && rangs[0],
      lang: "Русский",
      region: "Kazakhstan",
      uncal: user && uidDoc,
      game: nameGame,
    });
  };

  return (
    <main>
      <ModalClose
        modal={cardStatus}
        setModal={setCardStatus}
        refModal={cardRef}
        refButton={cardBtnRef}
        refButton2={card2Ref}
      />
      {checkLogin && <Login setLogin={setCheckLogin} btnRef={""} />}
      <Section>
        <div className={Style.game}>
          <div className={Style.game_filter}>
            <div className={Style.game_filter_burger}>
              <button
                onClick={() => {
                  setBurger((prev) => !prev);
                }}
              >
                <div></div>
                <div></div>
                <div></div>
              </button>
            </div>

            {burger && (
              <div className={Style.game_filter_none}>
                <h3 style={{ marginBottom: "10px" }}>{t("filter")}</h3>
                <select
                  style={{ width: "80%" }}
                  onChange={(e) => {
                    setFiltr((prev) => (prev = e.target.value));
                    setBurger((prev) => !prev);
                  }}
                  className={Style.game_filter_country}
                  name="country"
                >
                  <option defaultValue={"All"} value="All">
                    {t("All")}
                  </option>
                  <option value="Kazakhstan">{t("Kazakhstan")}</option>
                  <option value="Russia">{t("Russia")}</option>
                  <option value="Ukraine">{t("Ukraine")}</option>
                  <option value="Kyrgyzstan">{t("Kyrgyzstan")}</option>
                  <option value="Uzbekistan">{t("Uzbekistan")}</option>
                  <option value="Armenia">{t("Armenia")}</option>
                  <option value="Tajikistan">{t("Tajikistan")}</option>
                  <option value="Georgia">{t("Georgia")}</option>
                </select>
              </div>
            )}

            <div className={Style.game_filter_desk}>
              <h3>{t("filter")}</h3>
              <select
                onChange={(e) => {
                  setFiltr((prev) => (prev = e.target.value));
                }}
                className={Style.game_filter_country}
                name="country"
              >
                <option defaultValue={"All"} value="All">
                  {t("All")}
                </option>
                <option value="Kazakhstan">{t("Kazakhstan")}</option>
                <option value="Russia">{t("Russia")}</option>
                <option value="Ukraine">{t("Ukraine")}</option>
                <option value="Kyrgyzstan">{t("Kyrgyzstan")}</option>
                <option value="Uzbekistan">{t("Uzbekistan")}</option>
                <option value="Armenia">{t("Armenia")}</option>
                <option value="Tajikistan">{t("Tajikistan")}</option>
                <option value="Georgia">{t("Georgia")}</option>
              </select>
            </div>

            <button
              ref={cardBtnRef}
              onClick={createCard}
              className={Style.game_filter_create}
            >
              {t("create_card")}
            </button>
          </div>
          {cardStatus && (
            <div className={Style.game_create}>
              <div ref={cardRef} className={Style.game_create_block}>
                <div className={Style.game_create_block_two}>
                  <div>
                    <h3>{t("created_card")}</h3>

                    <div className={Style.game_create_block_flex}>
                      <label htmlFor="region">
                        <p>
                          <i className="fa-solid fa-flag"></i>
                          {t("country")}
                        </p>
                        <select
                          value={cardData.region}
                          onChange={(e) => {
                            setCardData({
                              ...cardData,
                              region: e.target.value,
                            });
                          }}
                          name="region"
                          id="region"
                        >
                          <option
                            defaultValue={"Kazakhstan"}
                            value="Kazakhstan"
                          >
                            {t("Kazakhstan")}
                          </option>
                          <option value="Russia">{t("Russia")}</option>
                          <option value="Ukraine">{t("Ukraine")}</option>
                          <option value="Kyrgyzstan">{t("Kyrgyzstan")}</option>
                          <option value="Uzbekistan">{t("Uzbekistan")}</option>
                          <option value="Armenia">{t("Armenia")}</option>
                          <option value="Tajikistan">{t("Tajikistan")}</option>
                          <option value="Georgia">{t("Georgia")}</option>
                        </select>
                      </label>

                      <label htmlFor="lang">
                        <p>
                          <i className="fa-solid fa-language"></i>
                          {t("lang")}
                        </p>
                        <select
                          value={cardData.lang}
                          onChange={(e) => {
                            setCardData({
                              ...cardData,
                              lang: e.target.value,
                            });
                          }}
                          name="lang"
                          id="lang"
                        >
                          <option defaultValue={"Русский"} value="Русский">
                            Русский
                          </option>
                          <option value="English">English</option>
                          <option value="Қазақ">Қазақ</option>
                        </select>
                      </label>

                      <label htmlFor="rang">
                        <p>
                          <i className="fa-solid fa-trophy"></i>
                          {t("rank")}
                        </p>
                        <select
                          value={cardData.rang}
                          onChange={(e) => {
                            setCardData({
                              ...cardData,
                              rang: e.target.value,
                            });
                          }}
                          name="rang"
                          id="rang"
                        >
                          {rangs &&
                            rangs.map((data, id) => (
                              <option key={id} value={data}>
                                {data}
                              </option>
                            ))}
                        </select>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3>{t("contacts_can")}</h3>

                    <div className={Style.game_create_block_flex}>
                      <div className={Style.game_create_block_flex_input}>
                        <div style={{ borderRight: "1px solid" }}>
                          <img
                            width={25}
                            src="../img/Card/discord.png"
                            alt="Discord"
                          />
                        </div>
                        <input
                          value={cardData.discord}
                          onChange={(e) => {
                            setCardData({
                              ...cardData,
                              discord: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="https://discord.gg/example"
                        />
                      </div>

                      <div className={Style.game_create_block_flex_input}>
                        <div style={{ borderRight: "1px solid" }}>
                          <img
                            width={25}
                            src="../img/Card/telegram.png"
                            alt="Telegram"
                          />
                        </div>
                        <input
                          value={cardData.tg}
                          onChange={(e) => {
                            setCardData({
                              ...cardData,
                              tg: e.target.value,
                            });
                          }}
                          type="text"
                          placeholder="https://t.me/example"
                        />
                      </div>

                      <div className={Style.game_create_block_flex_input}>
                        <div style={{ borderRight: "1px solid" }}>
                          <img width={25} src="../img/Card/vk.png" alt="Vk" />
                        </div>
                        <input
                          value={cardData.vk}
                          onChange={(e) => {
                            setCardData({
                              ...cardData,
                              vk: e.target.value,
                            });
                          }}
                          type="text"
                          max={20}
                          placeholder="https://vk.com/example"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={Send}>{t("create")}</button>
              </div>
            </div>
          )}
          {cards && cards.length >= 1 ? (
            <div className={Style.game_cards}>
              {cards.map(
                (data, id) =>
                  (filtr === "All" || filtr === data.region) && (
                    <div className={Style.game_cards_block} key={id}>
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
                          <a
                            rel="noreferrer"
                            target="_blank"
                            href={data.discord}
                          >
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
                  )
              )}
              <div ref={card2Ref}></div>
            </div>
          ) : (
            <div className={Style.empty}>
              <div className={Style.empty_block}>
                <h3>{t("empty")}</h3>
                <button ref={card2Ref} onClick={createCard}>
                  {t("find_comrade")}
                </button>
              </div>
            </div>
          )}
        </div>
      </Section>
    </main>
  );
};

export default Game;
