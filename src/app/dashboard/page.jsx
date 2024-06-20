import LogoutButton from "@/components/auth/logout-button";
import UserPanelCilent from "@/components/dashboard/userPanelClient";
import UserPanelServer from "@/components/dashboard/userPanelServer";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <h1>DashboardPage</h1>
      <p>intended to be secure</p>
      <hr />
      <div className="columns-2">
        <UserPanelServer />
        <UserPanelCilent />
      </div>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
