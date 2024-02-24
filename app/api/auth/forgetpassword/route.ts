import { errors } from "@vinejs/vine";
import { User } from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";
import cryptoRandomString from "crypto-random-string";
import Cryptr from "cryptr";
import Env from "@/config/env";
import { render } from "@react-email/components";
import ForgetPassEmail from "@/emails/forgetpassword";
import { sendMail } from "@/config/mail";
import { connect } from "@/app/utils/db";

connect();

export async function POST(req: NextRequest) {
  const payload: any = await req.json();

  // Check if the email exists in the database
  const user = await User.findOne({ email: payload.email });
  if (user === null) {
    return NextResponse.json({
      status: 404,
      error: {
        email: "Email not found",
      },
    });
  }

  // Generate a random string
  const randomStr = cryptoRandomString({ length: 64, type: "alphanumeric" });
  user.password_reset_token = randomStr;
  await user.save();

  // Encrypt user Email
  const crypt = new Cryptr(Env.SECRET_KEY);
  const encryptedEmail = crypt.encrypt(user.email);
  const url = `${Env.APP_URL}/resetpassword?token=${randomStr}&email=${encryptedEmail}`;

  try {
    const html = render(
      ForgetPassEmail({ params: { name: user.name, url: url } })
    );

    // Send the email
    await sendMail(payload.email, "Reset your password", html);
    return NextResponse.json({ message: "Email sent" });
  } catch (error) {
    return NextResponse.json({ message: "Email not sent" }, { status: 500 });
  }
}
