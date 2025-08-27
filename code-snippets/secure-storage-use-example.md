```ts
import React from "react";
import { View, Button, Text } from "react-native";
import { useSecureStore } from "./useSecureStore";

export default function App() {
  const { value, setSecureValue, getValue, deleteValue } = useSecureStore("");

  return (
    <View style={{ padding: 20 }}>
      <Text>Stored Token: {value || "No token stored"}</Text>

      <Button
        title="Save Token"
        onPress={() => setSecureValue("my-secret-token")}
      />

      <Button title="Get Token" onPress={getValue} />

      <Button title="Delete Token" onPress={deleteValue} />
    </View>
  );
}
```
