import UserAccount from "../components/UserAccount/UserAccount";
import Navbar from "../components/Navbar/navbar";
import { Fragment } from "react";

const Profile = () => {
  return (
    <Fragment>
      <Navbar />
      <UserAccount />
    </Fragment>
  );
};

export default Profile;
