import { sendVerificationEmail } from "./lib/mail";

async function test() {
  try {
    await sendVerificationEmail("dfordolapo@gmail.com", "test-token-123");
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

test();
