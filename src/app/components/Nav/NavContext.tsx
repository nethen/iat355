"use client";
import { useLenis } from "lenis/react";
import { createContext, useContext } from "react";
import { useBoolean } from "usehooks-ts";

// export const NavContext = createContext();

export const NavContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const visible = useBoolean(false);
  const lenis = useLenis();

  return <body>{children}</body>;
};
