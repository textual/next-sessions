"use server";
// import { NextRequest, NextResponse } from "next/server";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { axiosInstance, axiosBase } from "@/lib/axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
const refreshKey = new TextEncoder().encode(process.env.JWT_REFRESH_KEY);
const verifyKey = refreshKey;
// const refreshKey = process.env.JWT_REFRESH_KEY;
const jwtExpiryTime = 1000 * 60 * 10; // 10 mins
const refreshExpirytime = 1000 * 60 * 60 * 24 * 30; // 30 days

export async function logout() {
  // Destroy the session
  // cookies().set("session", "", { expires: new Date(0) }); // old
  // cookies().set("refresh", "", { expires: new Date(0) }); // old
  cookies().set("session", "", { maxAge: 0 }); // new
  cookies().set("refresh", "", { maxAge: 0 }); // new

  // delete axiosInstance.defaults.headers.common["Authorization"];
  console.log("cookjes deleted");
}

export async function getSessionCookie() {
  const session = cookies().get("session")?.value;
  console.log("auth actions getSessionCookie says", session);
  if (!session) return null;
  return session;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  // console.log("auth actions session says", session);
  if (!session) return null;
  return await decrypt(session, secretKey);
}

export async function getRefresh() {
  const refresh = cookies().get("refresh")?.value;
  // console.log("auth actions refresh says", refresh);
  if (!refresh) return null;
  return await decrypt(refresh, refreshKey);
}

export async function getVerify() {
  const verify = cookies().get("verify")?.value;
  // console.log("auth actions verify says", verify);
  if (!verify) return null;
  return await decrypt(verify, verifyKey);
}

export async function authenticate(prevState, formData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const entry_object = { email, password, mode: "signin" };
    console.log("entry_object ", entry_object);
    // if (password !== "ADMIN") {
    //   throw new Error("incorrect login");
    // }
    // curl -i -X POST http://localhost:8200/auth/entry -H "Content-Type: application/json" -d '{"email":"test@email.com", "password":"g0Racing!", mode: "signin"}'

    const response = await axiosInstance.post("/auth/entry", entry_object, {
      withCredentials: true,
    });
    console.log("write cookies with ", response.data);
    await processTokens(response.data);

    // axiosInstance.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${response.data.accessToken}`;

    // axiosInstance.interceptors.request.use((config) => {
    //   // const session = await getSession();
    //   if (!config.headers["Authorization"]) {
    //     config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
    //   }
    //   return config;
    // });
  } catch (error) {
    if (error?.response?.data) {
      return error.response.data.error;
    } else {
      console.log("whats  the erorr i just threw", error);
      return error.message;
    }
  }
  redirect(BASE_URL + "/dashboard");
}

export async function processTokens({ accessToken, refreshToken }) {
  const d_access = await decrypt(accessToken, secretKey);
  const d_refresh = await decrypt(refreshToken, refreshKey);
  console.log("write access token ", d_access);
  console.log("write refresh token ", d_refresh);

  const user = {
    id: d_access.id,
    name: d_access.name,
    image: d_access.profile_photo,
  };
  console.log("cookie section - now", Date.now());
  console.log("cookie section - new date now", new Date(Date.now()));
  console.log("access token expiry raw ", d_access.exp);
  console.log(
    "incorrect access token expiry date ",
    new Date(d_access.exp).toLocaleDateString()
  );
  console.log(
    "access token set to expire ",
    new Date(d_access.exp * 1000).toLocaleDateString()
  );
  console.log("add jwt expiry ", jwtExpiryTime);
  // const access_expires = new Date((d_access.exp + jwtExpiryTime) * 1000); // + jwtExpiryTime);
  // const access_expires = d_access.exp; // try jsut using what the server gives you
  // const access_expires = new Date(jwtExpiryTime); // * 1000); // + jwtExpiryTime);
  // const access_expires = (d_access.exp + jwtExpiryTime) * 1000;
  // const access_expires = d_access.exp + jwtExpiryTime;
  const access_expires = new Date(Date.now() + jwtExpiryTime);
  // const refresh_expires = new Date((d_refresh.exp + refreshExpirytime) * 1000); // + jwtExpiryTime);
  // const refresh_expires = (d_refresh.exp + refreshExpirytime) * 1000; // + jwtExpiryTime);
  // const refresh_expires = new Date(Date.now() + d_refresh.exp);
  const refresh_expires = new Date(Date.now() + refreshExpirytime); // + jwtExpiryTime);

  console.log(
    "new access token set to expire ",
    new Date(access_expires).toISOString()
  );
  const token_diff = access_expires - d_access.exp;

  console.log("new access token_diff ", token_diff / 1000);

  console.log(
    "new access token set to expire ",
    new Date(access_expires * 1000).toISOString()
  );

  const signed_access_token = await encrypt(user, access_expires, secretKey);
  const signed_refresh_token = await encrypt(user, refresh_expires, refreshKey);

  cookies().set("session", signed_access_token, {
    expires: access_expires,
    httpOnly: true,
  });
  cookies().set("refresh", signed_refresh_token, {
    expires: refresh_expires,
    httpOnly: true,
  });
  return user;
}
async function encrypt(payload, expires, key) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires)
    .sign(key);
}

async function decrypt(input, key) {
  try {
    // jwt.verify(
    // jwtVerify
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    // const payload = await jwt.verify(input, key);
    return payload;
  } catch (error) {
    console.log("error decrypting", error);
    return null;
  }
}
