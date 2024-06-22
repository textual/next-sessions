"use client";

import { useAuth } from "@/contexts/auth";
import JsonViewer from "../jsonViewer";

const UserPanelCilent = () => {
  const { user } = useAuth();
  const user_expiry = user ? new Date(user?.exp * 1000) : null;

  return (
    <div className="m-2 border-2 rounded-md p-2">
      <h1>UserPanel - Cilent</h1>
      {/* {JSON.stringify(user, null, 2)} */}
      <JsonViewer jsonData={user} />
      <p>user expiry: {JSON.stringify(user_expiry)}</p>
    </div>
  );
};

export default UserPanelCilent;
