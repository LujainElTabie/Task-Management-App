import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH } from "../../FirebaseConfig";
import EmailIcon from "../assets/images/auth/email.svg";
import PassEyelash from "../assets/images/auth/passwordEyelash.svg";
import PassLock from "../assets/images/auth/passwordLock.svg";
import Button from "../components/Button";
import Input from "../components/Input";

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      .then((userCredential) => {
        navigation.navigate("Main Screen");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert("Wrong password/email");
      });
  };
  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-black font-semibold text-2xl mb-11">
        Welcome Back!
      </Text>
      <Input
        value={email}
        onChangeText={setEmail}
        iconLeft={<EmailIcon />}
        label={"Email Address"}
      />
      <View className="mb-6" />
      <Input
        secureTextEntry={passwordHidden}
        value={password}
        onChangeText={setPassword}
        iconLeft={<PassLock />}
        iconRight={
          <TouchableOpacity onPress={() => setPasswordHidden(!passwordHidden)}>
            <PassEyelash />
          </TouchableOpacity>
        }
        label={"Password"}
      />
      <View className="mb-8" />
      <Button
        loading={loading}
        text={"Login"}
        disabled={email === "" || password === ""}
        onClick={login}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup Screen")}
        className="flex-row justify-center mt-7"
      >
        <Text className="text-sm text-black">Don’t have an account? </Text>
        <Text className="text-sm text-primary">Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen;
