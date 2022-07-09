import classes from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  return (
    // <div className={classes.container}>
    //   <div className={classes.spinner}></div>
    // </div>
    <div className={classes.center}>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
      <div class={classes.wave}></div>
    </div>
  );
};

export default LoadingSpinner;
