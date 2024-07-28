import { Route, Routes, Navigate } from "react-router-dom";
import React, { lazy, memo, Suspense } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "..";
import ErrorBoundary from "./ErrorBounds/ErrorBoundary";
const Preloader = lazy(() => import("./Preloaders/Preloader")),
  Menu = lazy(() => import("../menu/Menu")),
  Pubg = lazy(() => import("../main/Pubg")),
  Dota2 = lazy(() => import("../main/Dota2")),
  CS2 = lazy(() => import("../main/CS2")),
  RainbowSix = lazy(() => import("../main/RainbowSix")),
  Phasmophobia = lazy(() => import("../main/Phasmophobia")),
  KillingFloor2 = lazy(() => import("../main/FillingFloor2")),
  MobileLegends = lazy(() => import("../main/MobileLegends")),
  Profile = lazy(() => import("../main/profile/Profile")),
  privatRoutes = [
    {
      path: "/profile",
      Component: Profile,
    },
  ],
  publicRoutes = [
    {
      path: "/",
      Component: Menu,
    },
    {
      path: "/pubg",
      Component: Pubg,
    },
    {
      path: "/cs2",
      Component: CS2,
    },
    {
      path: "/dota2",
      Component: Dota2,
    },
    {
      path: "/rainbow",
      Component: RainbowSix,
    },
    {
      path: "/phasma",
      Component: Phasmophobia,
    },
    // {
    //   path: "/killing",
    //   Component: KillingFloor2,
    // },
    {
      path: "/mob",
      Component: MobileLegends,
    },
  ];

const AppRouter = memo(() => {
  const [user] = useAuthState(auth);
  return user ? (
    <Routes>
      {privatRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          element={
            <Suspense fallback={<Preloader />}>
              <ErrorBoundary>
                <Component />
              </ErrorBoundary>
            </Suspense>
          }
        />
      ))}
      {publicRoutes &&
        publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes &&
        publicRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <Suspense fallback={<Preloader />}>
                <ErrorBoundary>
                  <Component />
                </ErrorBoundary>
              </Suspense>
            }
          />
        ))}
      <Route path="*" element={<Navigate to={"/"} replace />} />
    </Routes>
  );
});

export default AppRouter;
