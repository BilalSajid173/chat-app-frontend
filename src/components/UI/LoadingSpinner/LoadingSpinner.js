import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    // <div className={classes.container}>
    //   <div className={classes.spinner}></div>
    // </div>
    <div className={classes.center}>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
      <div className={classes.wave}></div>
    </div>
  );
};

export default LoadingSpinner;
