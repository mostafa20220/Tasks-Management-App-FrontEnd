import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import RegisterForm from "components/RegisterFrom";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);
  console.log("form dashboard, session:", session);
  if (session) redirect("/dashboard");

  return <RegisterForm />;
  // return <RegisterForm Signup={SignUp} />;
}
