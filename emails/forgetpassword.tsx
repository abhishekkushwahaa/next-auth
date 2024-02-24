import { Button, Heading, Hr, Html, Text } from "@react-email/components";
import * as React from "react";

const ForgetPassEmail = ({
  params,
}: {
  params: { name: string; url: string };
}) => {
  return (
    <Html>
      <Heading as="h2">Hello {params.name}</Heading>
      <Text>Click the button below to reset your password</Text>
      <Button
        href={params.url}
        style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
      >
        Reset Password
      </Button>
      <Hr />
      <Heading as="h3">
        If you did not request a password reset, no further action is required.
      </Heading>
    </Html>
  );
};
export default ForgetPassEmail;
