import React, { createContext, useContext, useState } from "react";
const contextApi = createContext();
export const ContextProvider = ({ children }) => {
	const [userData, setUserData] = useState({
		user: "",
		token: "",
	});

	return (
		<contextApi.Provider value={[userData, setUserData]}>
			{children}
		</contextApi.Provider>
	);
};
export const useGlobalContext = () => {
	return useContext(contextApi);
};
