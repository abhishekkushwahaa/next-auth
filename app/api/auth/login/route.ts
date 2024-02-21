import { User } from "@/app/models/User";
import { connect } from "@/app/utils/db";
import { loginSchema } from "@/app/validator/authSchema";
import ErrorReporter from "@/app/validator/errorReporter";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(loginSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    // Check if the email exists
    const user = await User.findOne({ email: output.email });
    if (user) {
      const checkPassword = bcrypt.compareSync(output.password!, user.password);
      if (checkPassword) {
        return NextResponse.json(
          { status: 200, message: "User logged in successfully" },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { status: 400, errors: { password: ["The password is incorrect"] } },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { status: 400, errors: { email: ["The email does not exist"] } },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
