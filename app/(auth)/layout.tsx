import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  //If a user is logged in and tries to access the sign-in page without logging out, redirect to the home page
  const isUserAuthenticated = await isAuthenticated();

  if (isUserAuthenticated) {
    return redirect("/");
  }

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
 