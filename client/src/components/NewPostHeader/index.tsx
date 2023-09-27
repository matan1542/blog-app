import { useNavigate } from "react-router-dom";
import style from "./style.module.scss";

const NewPostHeader = () => {
  const router = useNavigate();

  const backToHome = () => {
    router("/");
  };
  return (
    <header className={style.headerContainer} onClick={backToHome}>
      <img src="media/icons/medium-logo.svg" alt="company logo" />
    </header>
  );
};

export default NewPostHeader;
