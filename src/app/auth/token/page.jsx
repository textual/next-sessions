import { getSession, getRefresh, getVerify, logout } from "@/lib/authActions";
import JsonViewer from "@/components/jsonViewer";

const TokenPage = async () => {
  const session = await getSession();
  const refresh = await getRefresh();
  const verify = await getVerify();

  const session_expiry = session
    ? new Date(session?.exp * 1000).toISOString()
    : null;

  // const session_expiry = session?.exp;

  const refresh_expiry = refresh
    ? new Date(refresh?.exp * 1000).toISOString()
    : null;

  const verify_expiry = verify
    ? new Date(verify?.exp * 1000).toISOString()
    : null;
  return (
    <div>
      <h1>token check page</h1>
      <p>session:</p>
      {Boolean(session) && <JsonViewer jsonData={session} />}
      <p>user expiry: {session_expiry}</p>
      <hr />
      <p>refresh:</p>
      {Boolean(refresh) && <JsonViewer jsonData={refresh} />}
      <p>refresh expiry: {refresh_expiry}</p>
      <hr />
      <p>verify:</p>
      {Boolean(verify) && <JsonViewer jsonData={verify} />}
      <p>verify expiry: {verify_expiry}</p>
      <hr className="my-4" />
      <form
        action={async () => {
          "use server";
          await logout();
          //   redirect("/");
        }}
      >
        <button
          type="submit"
          className="mx-1 bg-red-200 px-3 py-1 rounded-md"
          disabled={!session && !refresh}
        >
          logout - clears session and refresh
        </button>
      </form>
    </div>
  );
};

export default TokenPage;
