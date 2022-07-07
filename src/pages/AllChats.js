import { Fragment } from "react";
import Navbar from "../components/Navbar/navbar";
import EveryChat from "../components/AllChats/EveryChat";

const AllChats = () => {
  return (
    <Fragment>
      <Navbar />
      <EveryChat />
    </Fragment>
  );
};

export default AllChats;
