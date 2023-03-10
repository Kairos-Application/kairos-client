import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import {
  firstNameChanged,
  lastNameChanged,
  birthChanged,
  genderChanged,
  emailChanged,
  passwordChanged,
  password2Changed,
  mobileChanged,
  addr1Changed,
  addr2Chnaged,
  cityChanged,
  stateChanged,
  zipChanged,
  distanceChanged,
  bioChanged,
  priceChanged,
} from "../features/userSlice";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const {
    firstName,
    lastName,
    birth,
    gender,
    email,
    password,
    mobile,
    addr1,
    addr2,
    city,
    state,
    zip,
    distance,
    home,
    online,
    gym,
    avatar,
    bio,
    price,
  } = useSelector((state) => state.user);
  const { role } = useSelector((state) => state.general);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {avatar ? (
            <Image
              source={{ uri: avatar }}
              style={{ width: 120, height: 120, borderRadius: 60 }}
            />
          ) : (
            <View style={styles.circle}></View>
          )}
          {role == "provider" && (
            <TextInput
              style={{
                height: 104,
                width: 140,
                borderWidth: 0.5,
                marginHorizontal: 20,
                paddingHorizontal: 6,
                paddingVertical: 6,
              }}
              value={bio}
              onChangeText={(text) => {
                dispatch(bioChanged(text));
              }}
            ></TextInput>
          )}
        </View>
        <PrimaryButton
          title={"Update profile picture"}
          fontSize={12}
          fontWeight={500}
          marginTop={10}
          marginBotton={14}
          paddingVertical={4}
          paddingHorizontal={14}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={firstName}
            style={[styles.textInput, { width: 154 }]}
            placeholder={"First Name"}
            onChangeText={(text) => {
              dispatch(firstNameChanged(text));
            }}
          />
          <TextInput
            value={lastName}
            style={[styles.textInput, { width: 154 }]}
            placeholder={"Last Name"}
            onChangeText={(text) => {
              dispatch(lastNameChanged(text));
            }}
          />
        </View>
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={birth}
            style={[styles.textInput, { width: 70.6 }]}
            placeholder={"Birth"}
            onChangeText={(text) => {
              dispatch(birthChanged(text));
            }}
          />
          <TextInput
            value={gender}
            style={[styles.textInput, { width: 70.6 }]}
            placeholder={"Gender"}
            onChangeText={(text) => {
              dispatch(genderChanged(text));
            }}
          />
          <TextInput
            value={email}
            style={[styles.textInput, { width: 154.6 }]}
            placeholder={"Email Address"}
            onChangeText={(text) => {
              dispatch(emailChanged(text));
            }}
          />
        </View>
        <TextInput
          value={password}
          style={styles.textInput}
          placeholder={"Password"}
          onChangeText={(text) => {
            dispatch(passwordChanged(text));
            dispatch(password2Changed(text));
          }}
        />
        <TextInput
          value={mobile}
          style={styles.textInput}
          placeholder={"Phone Number"}
          onChangeText={(text) => {
            dispatch(mobileChanged(text));
          }}
        />
        <TextInput
          value={addr1}
          style={styles.textInput}
          placeholder={"Address 1"}
          onChangeText={(text) => {
            dispatch(addr1Changed(text));
          }}
        />
        <TextInput
          value={addr2}
          style={styles.textInput}
          placeholder={"Address 2"}
          onChangeText={(text) => {
            dispatch(addr2Chnaged(text));
          }}
        />
        <View style={{ flexDirection: "row" }}>
          <TextInput
            value={city}
            style={[styles.textInput, { width: 90.6 }]}
            placeholder={"City"}
            onChangeText={(text) => {
              dispatch(cityChanged(text));
            }}
          />
          <TextInput
            value={state}
            style={[styles.textInput, { width: 85.6 }]}
            placeholder={"State"}
            onChangeText={(text) => {
              dispatch(stateChanged(text));
            }}
          />
          <TextInput
            value={zip}
            style={[styles.textInput, { width: 120.6 }]}
            placeholder={"Zip Code"}
            onChangeText={(text) => {
              dispatch(zipChanged(text));
            }}
          />
        </View>
        <TextInput
          value={distance ? String(distance) : ""}
          style={styles.textInput}
          placeholder={"Maximum Travel Distance: 0"}
          onChangeText={(text) => {
            if (text) {
              dispatch(distanceChanged(parseInt(text)));
            } else {
              dispatch(distanceChanged(0));
            }
          }}
        />
        {role == "customer" ? (
          <View>
            <TextInput
              value={`Willing to train at zoom: ${online ? "Yes" : "No"}`}
              style={styles.textInput}
              placeholder={"Willing to train over Zoom? "}
            />
            <TextInput
              value={`Willing to train at home: ${home ? "Yes" : "No"}`}
              style={styles.textInput}
              placeholder={"Willing to train at home?"}
            />
          </View>
        ) : (
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={`Home session: ${online ? "Yes" : "No"}`}
              style={[styles.textInput, { width: 154 }]}
            ></TextInput>
            <TextInput
              value={`Zoom session: ${online ? "Yes" : "No"}`}
              style={[styles.textInput, { width: 154 }]}
            ></TextInput>
          </View>
        )}

        {role == "provider" && (
          <TextInput
            value={String(price)}
            style={[styles.textInput, { width: 160 }]}
            placeholder={"Minimum Bid"}
            onChangeText={(text) => {
              dispatch(priceChanged(parseInt(text)));
            }}
          />
        )}
        <PrimaryButton title={"Save"} />
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
    marginTop: 20,
    alignItems: "center",
  },
  circle: {
    borderWidth: 0.2,
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: "#ccc",
  },
  textInput: {
    borderWidth: 1.8,
    borderRadius: 4,
    textAlign: "center",
    height: 46,
    width: 320,
    marginHorizontal: 6,
    marginVertical: 5,
    fontSize: 16,
  },
});
