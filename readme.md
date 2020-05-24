## SALPS

Simple and ligth persisted state (SALPS) is a lib for manager a local state in you app, with general purposes run with reactJS and react-native.

## Installation

Using npm:

```shell
npm install --save salps
```

or using yarn:

```shell
yarn add salps
```

## Usage

first create a store config file

```javascript
const initialState = {
  loged: false,
};

const config = { key: "ROOT", persistList: ["loged"] };

function reducers(state = initialState, action) {
  switch (action.type) {
    case "IN":
      return { ...state, loged: true };
    case "OUT":
      return { ...state, loged: false };
    default:
      return state;
  }
}

export default { initialState, config, reducers };
```

then insert your app inside of SALPSProvider

```javascript
import React from "react";
import { View, Text, Button } from "react-native";
import SALPS, { useSALPS } from "salps/native";
import storeConfig from "./store";

export default function Navigator() {
  return (
    <SALPS {...storeConfig}>
      <App />
    </SALPS>
  );
}

function App() {
  const { state } = useSALPS();
  return state.loged ? <Dashboard /> : <Auth />;
}

function Auth() {
  const { dispatch, state } = useSALPS();

  function login() {
    dispatch({ type: "IN" });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Auth</Text>
      <Button title="Login" onPress={login} />
    </View>
  );
}

function Dashboard() {
  const { dispatch } = useSALPS();

  function logout() {
    dispatch({ type: "OUT" });
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Dashboard</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
}
```

## useSALPS();

using the hook useSALPS you can acess :

{
loading // true until the storage load
state // all state
dispatch // function to dispatch actions to change state
}
