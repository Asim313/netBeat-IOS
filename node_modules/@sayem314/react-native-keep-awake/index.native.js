import React, { useEffect } from "react";
import { NativeModules } from "react-native";

export const activateKeepAwake = () => {
  NativeModules.KCKeepAwake.activate();
};

export const deactivateKeepAwake = () => {
  NativeModules.KCKeepAwake.deactivate();
};

export const useKeepAwake = () => {
  useEffect(() => {
    activateKeepAwake();
    return deactivateKeepAwake;
  }, []);
};

export default () => {
  useEffect(() => {
    activateKeepAwake();
    return deactivateKeepAwake;
  }, []);

  return null;
};
