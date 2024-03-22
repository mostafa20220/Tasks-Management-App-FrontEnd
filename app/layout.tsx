import "styles/globals.css";
import { ReactNode } from "react";
import AppBar from "../components/AppBar";
import Provider from "./Provider";
import { Header } from "./Header";

export const metadata = {
  title: "Tasks Management",
  description: "A simple app to manage your tasks",
  keywords: "tasks, management, app, todo, list",
};

interface IProps {
  children: ReactNode;
}
export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <Provider>
          {/* <AppBar /> */}
          <Header />
          <div className={"  min-h-screen "}>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
