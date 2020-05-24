import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const SALPSContext = createContext({});

export default function SALPSProvider({
  children,
  reducers,
  initialState,
  config,
}) {
  const [hardStore, setHardStore] = useState({});
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(true);

  function dispatch(action) {
    if (!action || (action && !action.type)) return;
    setState((state) => reducers(state, action));
  }

  async function getData() {
    try {
      const data = await AsyncStorage.getItem(config?.key || "salps");
      setLoading(false);
      return { ...initialState, ...JSON.parse(data) };
    } catch (e) {
      setLoading(false);
      return null;
    }
  }

  async function setData(data) {
    try {
      await AsyncStorage.setItem(config?.key || "salps", JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  function initialActions() {
    getData().then((data) => setState(data || {}));
  }

  function checkHardStore() {
    if (!config || (config && !config.persistList)) return;

    let newHardStore = {};

    for (let i = 0; i < config.persistList.length; i++) {
      let persistKey = config.persistList[i];
      if (state[persistKey] !== hardStore[persistKey])
        newHardStore[persistKey] = state[persistKey];
    }

    if (Object.keys(newHardStore).length > 0) setHardStore(newHardStore);
  }

  function updateData() {
    setData(hardStore);
  }

  useEffect(initialActions, []);
  useEffect(checkHardStore, [state]);
  useEffect(updateData, [hardStore]);

  return (
    <SALPSContext.Provider value={{ state, dispatch, loading }}>
      {children}
    </SALPSContext.Provider>
  );
}

export function useSALPS() {
  return useContext(SALPSContext);
}
