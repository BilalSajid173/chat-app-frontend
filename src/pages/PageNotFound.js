import { Fragment } from "react";
import Navbar from "../components/Navbar/navbar";
import NotFound from "../components/404/NotFound";

const PageNotFound = () => {
  return (
    <Fragment>
      <Navbar />
      <NotFound />
    </Fragment>
  );
};
export default PageNotFound;
