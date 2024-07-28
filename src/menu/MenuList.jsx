import { Link } from "react-router-dom";
import Style from "../styles/menu/MenuList/MenuList.module.css";

const arrayLinks = [
  {
    to: "/pubg",
    name: "PUBG",
    img: "../../img/background-img/pubg2.jpg",
  },
  {
    to: "/cs2",
    name: "Сountr Strike 2",
    img: "../../img/background-img/Cs.jpg",
  },
  {
    to: "/dota2",
    name: "Dota 2",
    img: "../../img/background-img/dota.jpg",
  },
  {
    to: "/rainbow",
    name: "Rainbow Six",
    img: "../../img/background-img/rainbow.jpg",
  },
  {
    to: "/phasma",
    name: "Phasmophobia",
    img: "../../img/background-img/phasma.jpg",
  },
  // {
  //   to: "/killing",
  //   name: "Killing Floor 2",
  //   img: "../../img/background-img/KillingFloor2.jpeg",
  // },
  {
    to: "/mob",
    name: "Mobile Legends",
    img: "../../img/background-img/mob.jpg",
  },
];

const MenuList = () => {
  return (
    <nav className={Style.naviagation_md}>
      <ul>
        {arrayLinks &&
          arrayLinks.map((data, id) => (
            <li key={id}>
              <Link
                to={data.to}
              >
                <div
                  style={{ background: `url(${data.img})` }}
                  className={Style.navigation}
                >
                  <i className="fa-solid fa-gamepad"></i>
                  <div className={Style.navigation__id}>{id + 1}</div>
                  <p>{data.name}</p>
                </div>
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default MenuList;
