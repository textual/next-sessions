import LogoutButton from '@/components/auth/logout-button';
import ProfilePanel from '@/components/dashboard/profilePanel';
import UserPanelCilent from '@/components/dashboard/userPanelClient';
import UserPanelServer from '@/components/dashboard/userPanelServer';
import React from 'react';

const DashboardPage = () => {
  return (
    <div>
      <ProfilePanel />

      <hr />
      {/* <div className="columns-2 flex justify-between"> */}
      <UserPanelServer />
      <UserPanelCilent />
      {/* </div> */}
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
