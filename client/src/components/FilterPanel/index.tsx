import CreatePostBtn from "./CreatePostBtn";

import style from './style.module.scss';

const FilterPanel = () => {
  return (
    <div className={style.filterPanelContainer}>
      <CreatePostBtn />
    </div>
  );
};

export default FilterPanel;
