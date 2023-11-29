import Button from "./layout/Button";
import "./Recomended.css";
const Recommended = () => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button  value="" title="All Products" />
          <Button  value="dell" title="Dell" />
          <Button  value="Samsung" title="Samsung" />
          <Button  value="Iphone" title="Iphone" />
        </div>
      </div>
    </>
  );
};

export default Recommended;