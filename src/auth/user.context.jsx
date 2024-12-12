import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(null);

  return (
    <UserContext.Provider value={{ userName, setUserName ,userImage,setUserImage}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
