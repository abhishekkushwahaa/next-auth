import { errors } from "@vinejs/vine";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { connect } from "@/app/utils/db";
import bcrypt from "bcryptjs";

connect();

export async function POST(req: NextRequest) {
  const payload: resetPasswordType = await req.json();

  // You have to check both password and confirm_password are the same
  if (payload.password !== payload.confirm_password) {
    return NextResponse.json({
      status: 400,
      error: {
        password: "Password and confirm password do not match",
      },
    });
  }

  // Decrypt the email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const decryptedEmail = crypt.decrypt(payload.email);

  const user = await User.findOne({
    email: decryptedEmail,
    password_reset_token: payload.token,
  });

  if (user === null || user === undefined) {
    return NextResponse.json({
      status: 404,
      error: {
        email: "Reset token not found",
      },
    });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = bcrypt.hashSync(payload.password, salt);
  user.password_reset_token = "";
  await user.save();

  return NextResponse.json({
    status: 200,
    message: "Password reset successfully",
  });
}
