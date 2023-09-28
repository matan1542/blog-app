import style from "./style.module.scss";
import Header from "../Header";

const Layout = () => {
  return (
    <>
      <div className={style.layoutContainer}>
        <Header />
      </div>
    </>
  );
};

export default Layout;
