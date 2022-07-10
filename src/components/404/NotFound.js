import classes from "./NotFound.module.css";
import image from "../../images/notfound.jpg";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const goBackHandler = () => {
    navigate(-1);
  };
  return (
    <div className={classes.container}>
      <img src={image} alt="notfound"></img>
      <h1>PAGE NOT FOUND</h1>
      <p>Looks like the page you are looking for doesn't exist.</p>
      <button onClick={goBackHandler}>Go Back</button>
    </div>
  );
};

export default NotFound;
