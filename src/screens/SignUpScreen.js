import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";
import { CheckBox } from "@rneui/themed";
import PrimaryButton from "../components/PrimaryButton";
import { roleChanged } from "../features/generalSlice";
import {
  emailChanged,
  password2Changed,
  passwordChanged,
} from "../features/userSlice";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.general.role);
  const { email, password, password2 } = useSelector((state) => state.user);

  const handleSignUp = () => {
    console.log("goto InfoScreen and clear navigation stack");
    navigation.navigate("InfoScreen");
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {role == "customer" ? (
          <View>
            <Text style={styles.header}>Get Connected</Text>
            <Text style={[styles.header, { marginBottom: 14 }]}>
              With The Best!
            </Text>
          </View>
        ) : (
          <View>
            <Text style={styles.header}>Optimize your</Text>
            <Text
              style={[styles.header, { marginBottom: 14, textAlign: "center" }]}
            >
              TIME!
            </Text>
          </View>
        )}

        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Email</Text>
          <TextInput
            value={email}
            placeholder="Email"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(emailChanged(text));
            }}
          />
        </View>
        <View style={styles.textInputGroup}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={password}
            placeholder="Password (8 or more characters)"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(passwordChanged(text));
            }}
          />
        </View>
        <View style={[styles.textInputGroup, { marginBottom: 20 }]}>
          <Text style={styles.text}>Password</Text>
          <TextInput
            value={password2}
            placeholder="Password Again"
            style={styles.textInput}
            onChangeText={(text) => {
              dispatch(password2Changed(text));
            }}
          />
        </View>
        <View>
          <CheckBox
            title={"I'm a customer"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role == "customer" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch(roleChanged("customer"));
            }}
          />
          <CheckBox
            title={"I'm a provider"}
            size={24}
            textStyle={{ fontSize: 18, fontWeight: 500, color: "#000" }}
            wrapperStyle={{ marginTop: -10 }}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            checked={role == "provider" ? true : false}
            checkedColor="#000"
            onPress={() => {
              dispatch(roleChanged("provider"));
            }}
          />
        </View>
        <PrimaryButton title={"Sign Up"} onPress={handleSignUp} />
        <TouchableOpacity
          onPress={() => {
            console.log("goto LoginScreen and clear navigation stack");
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{ name: "LoginScreen" }],
              })
            );
          }}
        >
          <Text
            style={[
              styles.text,
              { marginTop: 10, textDecorationLine: "underline" },
            ]}
          >
            Already on Kairos?
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    alignItems: "center",
    marginTop: 70,
  },
  header: {
    fontSize: 32,
    fontWeight: 500,
    marginBottom: 10,
  },
  textInputGroup: {
    flexWrap: "wrap",
    margin: 10,
  },
  text: {
    fontSize: 16,
    marginLeft: 3,
    fontWeight: 500,
  },
  textInput: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 4,
    height: 50,
    width: 260,
    marginTop: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
});
