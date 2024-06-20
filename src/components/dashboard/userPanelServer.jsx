import { getSession } from "@/lib/authActions";
import JsonViewer from "../jsonViewer";
const UserPanelServer = async () => {
  const user = await getSession();
  const user_expiry = new Date(user?.exp * 1000).toISOString();

  return (
    <div className="m-2 border-2 rounded-md p-2">
      <h1>UserPanelServer</h1>
      {/* <p>user {JSON.stringify(user, null, 2)}</p> */}
      <JsonViewer jsonData={user} />
      <p>user expiry: {user_expiry}</p>
    </div>
  );
};

export default UserPanelServer;
