import React, { createContext, useState } from "react";

const VisibilityContext = createContext();

export const VisibilityProvider = ({ children }) => {
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  return (
    <VisibilityContext.Provider value={{ categoriesVisible, setCategoriesVisible }}>
      {children}
    </VisibilityContext.Provider>
  );
};

export default VisibilityContext;
