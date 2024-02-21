import { connect } from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/app/validator/authSchema";
import ErrorReporter from "@/app/validator/errorReporter";
import bcrypt from "bcryptjs";
import { User } from "@/app/models/User";

// Connect to the database
connect();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = vine.compile(registerSchema);
    validator.errorReporter = () => new ErrorReporter();
    const output = await validator.validate(body);

    // Check if the email already exists
    const user = await User.findOne({ email: output.email });
    if (user) {
      return NextResponse.json(
        { status: 400, errors: { email: ["The email is already taken"] } },
        { status: 200 }
      );
    } else {
      // Encrypt the password
      const salt = await bcrypt.genSaltSync(10);
      output.password = await bcrypt.hashSync(output.password, salt);

      await User.create(output);

      return NextResponse.json(
        { status: 200, message: "User created successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json(
        { status: 400, errors: error.messages },
        { status: 200 }
      );
    }
  }
}
