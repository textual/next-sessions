import { getSession, getSessionCookie } from '@/lib/authActions';
import { axiosInstance, apiInstance } from '@/lib/axios';

const UserInfoPanel = async () => {
  const session = await getSession();
  const sessonCookie = await getSessionCookie();
  let userInfo;
  try {
    console.log('making authenticated ccall');

    const tkdr_res = await apiInstance.post(
      '/api/tkdr/',
      {
        sessonCookie,
        url: '/api/user/',
        payload: null,
        action: 'get',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const res = await axiosInstance.get('/api/user/');
    console.log('user result ', res.data);
    console.log('tkdr_res result ', tkdr_res.data);
    userInfo = res?.data;
    console.log('dashboard page ', userInfo);
  } catch (error) {
    console.log('user error ', error.message);
    console.log('get user error ', error?.response?.data);
  }
  return (
    <div>
      <div>UserInfoPanel</div>
      <p className='mt-8'>authenicated call test: {JSON.stringify(userInfo)}</p>
    </div>
  );
};

export default UserInfoPanel;
