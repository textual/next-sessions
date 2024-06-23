import LogoutButton from "@/components/auth/logout-button";
import ProfilePanel from "@/components/dashboard/profilePanel";
import ProfilePanelClient from "@/components/dashboard/profilePanelClient";
import UserInfoPanel from "@/components/dashboard/userInfoPanel";
import UserPanelCilent from "@/components/dashboard/userPanelClient";
import UserPanelServer from "@/components/dashboard/userPanelServer";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <ProfilePanel />
      <UserPanelServer />
      <hr />
      {/* <div className="columns-2 flex justify-between"> */}

      <ProfilePanelClient />
      <UserPanelCilent />
      <hr />
      <UserInfoPanel />
      {/* </div> */}
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
