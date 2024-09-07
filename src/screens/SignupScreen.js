import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import EmailIcon from "../assets/images/auth/email.svg";
import Fullname from "../assets/images/auth/fullname.svg";
import PassEyelash from "../assets/images/auth/passwordEyelash.svg";
import PassLock from "../assets/images/auth/passwordLock.svg";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../FirebaseConfig";
import Button from "../components/Button";
import Input from "../components/Input";

function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [checkbox, setCheckbox] = useState(false);
  const [loading, setLoading] = useState(false);

  const createUser = async () => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
        fullname: fullname,
        email: user.email,
      });
      navigation.navigate("Login Screen");
      setLoading(false);
    } catch (error) {
      setLoading(false);

      Alert.alert("Invalid password/email");
    }
  };
  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-black font-semibold text-2xl mb-11">
        Create your account!
      </Text>
      <Input
        value={fullname}
        onChangeText={setFullname}
        iconLeft={<Fullname />}
        label={"Fullname"}
      />
      <View className="mb-6" />
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
      <BouncyCheckbox
        isChecked={checkbox}
        size={25}
        style={{ marginBottom: 28, marginEnd: 5 }}
        fillColor="#D7D7D7"
        unFillColor="#FFFFFF"
        textComponent={
          <View className="flex-row flex-wrap">
            <Text className="text-sm text-black">
              I have read & agreed to Owitasks{" "}
              <Text className="text-primary">
                Privacy Policy, Terms & Condition
              </Text>
            </Text>
          </View>
        }
        innerIconStyle={{
          borderColor: "#D7D7D7",
          borderRadius: 6,
        }}
        textStyle={{
          textDecorationLine: "none",
        }}
        iconStyle={{ borderRadius: 6, margin: 5 }}
        onPress={(isChecked) => {
          setCheckbox(isChecked);
        }}
      />

      <Button
        loading={loading}
        disabled={
          fullname === "" || email === "" || password === "" || !checkbox
        }
        onClick={() => {
          createUser(email, password);
        }}
        text={"Sign Up"}
      />
      <TouchableOpacity
        className="flex-row justify-center mt-7"
        onPress={() => navigation.navigate("Login Screen")}
      >
        <Text className="text-sm text-black">Already have an account? </Text>
        <Text className="text-sm text-primary">Login</Text>
      </TouchableOpacity>
    </View>
  );
}
export default SignupScreen;
