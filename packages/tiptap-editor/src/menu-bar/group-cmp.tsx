import React from "react";
import { useEditorConfig } from "../config-ctx";

const Group = ({ children }: { children: React.ReactNode }) => {
  const config = useEditorConfig();
  
  const features: string[] = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      // @ts-ignore
      const feature = child.type.id;
      if (feature) {
        features.push(feature);
      }
    }
  });

  const buttonGroup = features.filter((item) => config.features.includes(item));
  if (!buttonGroup.length) return null;

  return <div className="group">{children}</div>;
};

export default Group;