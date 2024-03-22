import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import LoginForm from "components/LoginFrom";
import { authOptions } from "app/api/auth/[...nextauth]/route";

export default async function SigninPage() {
  const session = await getServerSession(authOptions);
  // console.log("form signinPage, session:", session);
  if (session) redirect("/dashboard");

  return <LoginForm />;
}