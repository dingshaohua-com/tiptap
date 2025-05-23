import React from "react";
import { pascalToCamel } from "../utils";
import { useEditorConfig } from "../config-ctx";

const Group = ({ children }: { children: React.ReactNode }) => {
  const config = useEditorConfig();
  
  const features: string[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      const cmpName = child.type.name;
      const featureName = pascalToCamel(cmpName);
      features.push(featureName);
    }
  });

  const buttonGroup = features.filter((item) => config.features.includes(item));
  if (!buttonGroup.length) return null;

  
  return <div className="group">{children}</div>;
};

export default Group;