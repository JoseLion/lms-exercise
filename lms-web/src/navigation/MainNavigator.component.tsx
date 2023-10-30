import { ReactElement, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Cookies from "universal-cookie";

import { CoursesScreen } from "../components/courses/Courses.screen";
import { HomeScreen } from "../components/home/Home.screen";
import { NotFoundScreen } from "../components/not-found/NotFound.screen";
import { AuthService } from "../services/auth.service";
import { useAuth } from "../store/Auth.context";

import { NavBody } from "./MainNavigator.styles";
import { Topbar } from "./topbar/Topbar.component";

const cookies = new Cookies();

export function MainNavigator(): ReactElement {

  const { account, session, setAccount, setSession } = useAuth();

  useEffect(() => {
    if (session) {
      const subscription = AuthService
        .current()
        .subscribe({
          error: () => setAccount(undefined),
          next: setAccount,
        });

      return () => subscription.unsubscribe();
    }

    return () => undefined;
  }, [session]);

  useEffect(() => {
    const sessionCookie = cookies.get("Session") as string;

    if (sessionCookie) {
      setSession(sessionCookie);
    }
  }, []);

  return (
    <>
      <Topbar />

      <NavBody>
        <Routes>
          <Route path="*" element={<NotFoundScreen />} />

          {account === undefined && (
            <Route index={true} element={<HomeScreen />} />
          )}

          {account?.role === "ADMIN" && (
            <Route index={true} element={<CoursesScreen />} />
          )}
        </Routes>
      </NavBody>
    </>
  );
}
