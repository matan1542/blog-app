import FilterPanel from "../FilterPanel";
import style from "./style.module.scss";

const HomeHeader = () => {
  return (
    <header className={style.headerContainer}>
      <img src="media/icons/medium-logo.svg" alt="company logo" />
      <FilterPanel />
    </header>
  );
};

export default HomeHeader;
