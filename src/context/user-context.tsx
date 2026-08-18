'use client'
import { userInitialValue } from "@/utils/const";
import { IUser } from "@/utils/types";
import React, { createContext, useState } from "react";

interface IUserContext {
  user: IUser,
  setUser: (user: IUser) => void
}

export const UserContext = createContext<IUserContext | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(userInitialValue)

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  )
}