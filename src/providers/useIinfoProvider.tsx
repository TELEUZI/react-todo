import { createContext, useEffect, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import { getUserInfo } from '../api/user';

const UserContext = createContext<IUser | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  useEffect(() => {
    getUserInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);
  return <UserContext.Provider value={userInfo}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
