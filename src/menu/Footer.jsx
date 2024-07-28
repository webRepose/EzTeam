import { Link } from "react-router-dom";
import Style from "../styles/menu/Footer/Footer.module.css";

const Footer = () => {
  return (
    <footer className={Style.footer}>
      Контакты:
      <button
        style={{
          background: "linear-gradient(144deg, #af40ff, #5b42f3 50%, #00ddeb)",
        }}
      >
        <Link to={"https://t.me/asinzyho"}>Telegram</Link>
      </button>
      <button style={{ backgroundColor: "#36B60F" }}>
        <Link to={"https://wa.me/77078078506?text"}>Whatsapp</Link>
      </button>
      <button
        onClick={() => {
          window.navigator.clipboard.writeText("malekula.tm@gmail.com").then(()=>{
            alert('Copied')
          });
        }}
      >
        malekula.tm@gmail.com
      </button>
    </footer>
  );
};

export default Footer;
