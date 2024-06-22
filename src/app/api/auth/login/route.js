import { processTokens } from "@/lib/authActions";
import { NextResponse } from "next/server";
import { axiosInstance } from "@/lib/axios";

export async function POST(request, res) {
  try {
    console.log("loging in");
    const formData = await request.formData();
    console.log(formData);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("form check", email, password);

    const entry_object = { email, password, mode: "signin" };
    console.log("entry_object ", entry_object);
    // if (password !== "ADMIN") {
    //   throw new Error("incorrect login");
    // }
    const response = await axiosInstance.post("/auth/entry", entry_object);
    console.log("write cookies with ", response.data);
    const user = await processTokens(response.data);

    return NextResponse.json(user);
  } catch (error) {
    if (error?.response) {
      console.log("return error gracefully please", error.response.data);
      return NextResponse.json(
        { error: error.response.data.error },
        { status: 401 }
      );
    } else {
      return NextResponse.json({ error: "something bad" }, { status: 401 });
    }
  }
}
