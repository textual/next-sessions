import { getSessionCookie } from '@/lib/authActions';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { axiosInstance } from '@/lib/axios';

export async function GET(req) {
  // console.log("chceking token via api route");
  // const result = await getSessionCookie();
  const cookieStore = cookies();
  const result = cookieStore.get('session');

  let sessionCookie = req.cookies.get('session');

  console.log('chceking token for send to tkdr', sessionCookie);
  // console.log('chceking tbody for send to tkdr', await req.json());
  const req_json = await req.json();
  const url = req_json.url;
  const payload = req_json?.payload;

  console.log('chceking req_json for send to tkdr', req_json);
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${req_json.sessonCookie}`;
  const tkdr_result = await axiosInstance.get(url);

  console.log('tkdr_result', tkdr_result);
  // const result = await checkRefresh();
  return NextResponse.json(tkdr_result.data);
}

export async function POST(req) {
  // console.log("chceking token via api route");
  // const result = await getSessionCookie();
  const cookieStore = cookies();
  const result = cookieStore.get('session');

  let sessionCookie = req.cookies.get('session');

  console.log('chceking token for send to tkdr', sessionCookie);
  // console.log('chceking tbody for send to tkdr', await req.json());
  const req_json = await req.json();
  const url = req_json.url;
  const payload = req_json?.payload;

  console.log('chceking req_json for send to tkdr', req_json);
  axiosInstance.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${req_json.sessonCookie}`;
  const tkdr_result =
    req.action === 'get'
      ? await axiosInstance.get(url)
      : await axiosInstance.post(url, payload);
  // const tkdr_result = await axiosInstance.get(url);

  console.log('tkdr_result', tkdr_result);
  // const result = await checkRefresh();
  return NextResponse.json(tkdr_result.data);
}
