import UserProfile from "../components/UserAccount/UserProfile";
import Navbar from "../components/Navbar/navbar";
import { Fragment } from "react";

const Profile = () => {
  return (
    <Fragment>
      <Navbar />
      <UserProfile />
    </Fragment>
  );
};

export default Profile;
