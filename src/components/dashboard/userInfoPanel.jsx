import { getSession } from "@/lib/authActions";
import { axiosInstance } from "@/lib/axios";

const UserInfoPanel = async () => {
  const session = await getSession();
  let userInfo;
  try {
    console.log("making authenticated ccall");
    const res = await axiosInstance.get("/api/user");
    console.log("user result ", res.data);
    userInfo = res?.data;
    console.log("dashboard page ", userInfo);
  } catch (error) {
    console.log("get user error ", error?.response?.data);
  }
  return (
    <div>
      <div>UserInfoPanel</div>
      <p className="mt-8">authenicated call test: {JSON.stringify(userInfo)}</p>
    </div>
  );
};

export default UserInfoPanel;
