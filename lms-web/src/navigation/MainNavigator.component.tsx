import { ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import { HomeScreen } from "../components/home/Home.screen";
import { NotFoundScreen } from "../components/not-found/NotFound.screen";

import { NavBody } from "./MainNavigator.styles";
import { Topbar } from "./topbar/Topbar.component";

export function MainNavigator(): ReactElement {

  return (
    <>
      <Topbar />

      <NavBody>
        <Routes>
          <Route path="*" element={<NotFoundScreen />} />

          <Route index={true} element={<HomeScreen />} />
        </Routes>
      </NavBody>
    </>
  );
}
