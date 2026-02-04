import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const car = require("@/assets/images/carlogo2.png");
const DOWN_PAYMENT = [5, 10, 15, 20, 25, 30, 35];
const MONTH_OPTION = [24, 36, 48, 60, 72, 84];

export default function Input() {
  const [carPrice, setCarPrice] = useState("");
  const [carDownPayment, setCarDownPayment] = useState("");
  const [carMonth, setCarMonth] = useState("");
  const [carInterest, setCarInterest] = useState("");
  const [carInstallment, setCarInstallment] = useState("");

  const handleClick = () => {
    if (
      carPrice === "" ||
      carDownPayment === "" ||
      carMonth === "" ||
      carInterest === ""
    ) {
      Alert.alert("คำเตือน", "กรุณากรอกข้อมูลไม่ครบ");
      return;
    }
    let downPayment = (Number(carPrice) * Number(carDownPayment)) / 100;
    let carPayment = Number(carPrice) - downPayment;
    let totalInterest =
      ((carPayment * Number(carInterest)) / 100) * (Number(carMonth) / 12);
    let installmentPay = (carPayment + totalInterest) / Number(carMonth);

    router.push({
      pathname: "/result",
      params: {
        downPayment: downPayment.toFixed(2),
        carPayment: carPayment.toFixed(2),
        totalInterest: totalInterest.toFixed(2),
        installmentPay: installmentPay.toFixed(2),
        carPrice: installmentPay.toFixed(2),
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollcontainer}
      >
        <Image source={car} style={styles.carimage} />
        <View style={styles.inputcontainer}>
          <Text style={{ fontFamily: "Kanit_700Bold", fontSize: 26 }}>
            คำนวนค่างวดรถ
          </Text>
          <Text style={styles.inputTitle}>ราคารถ(บาท)</Text>

          <TextInput
            placeholder="เช่น 800000"
            keyboardType="numeric"
            style={styles.inputValue}
            onChangeText={setCarPrice}
          ></TextInput>
          <Text style={styles.inputTitle}>เลือกเงินดาวน์</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {DOWN_PAYMENT.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.downpayment,
                  carDownPayment === item.toString() &&
                    styles.downPaymentSelect,
                ]}
                onPress={() => setCarDownPayment(item.toString())}
              >
                <Text
                  style={[
                    styles.downlabel,
                    carDownPayment === item.toString() &&
                      styles.downLabelSelect,
                  ]}
                >
                  {item}%
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Text style={styles.inputTitle}>ระยะเวลาผ่อน (งวด)</Text>
          <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
            {MONTH_OPTION.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.moneyOption,
                  carMonth === item.toString() && styles.moneySelect,
                ]}
                onPress={() => setCarMonth(item.toString())}
              >
                <Text
                  style={[
                    styles.moneyLabel,
                    carMonth === item.toString() && styles.moneyLabelSelect,
                  ]}
                >
                  {item}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.inputTitle}>ดอกเบี้ย (%ต่อปี)</Text>
          <TextInput
            placeholder="เช่น 2.59"
            keyboardType="numeric"
            style={styles.inputValue}
            onChangeText={setCarInterest}
          />
          <TouchableOpacity onPress={handleClick} style={styles.btnCal}>
            <Text style={styles.labelCal}>คำนวนค่างวด</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  moneyOption: {
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  moneyLabel: {
    fontFamily: "Kanit_500Medium",
    fontSize: 16,
  },
  scrollcontainer: {
    flex: 1,
  },
  carimage: {
    width: "100%",
    height: 250,
    resizeMode: "cover",
  },
  inputcontainer: {
    backgroundColor: "#eeecec",
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  inputTitle: {
    fontFamily: "Kanit_600SemiBold",
    fontSize: 18,
    color: "#474646",
    marginTop: 18,
  },
  inputValue: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    backgroundColor: "#efefef",
    color: "#c0bebe",
    fontFamily: "Kanit_400Regular",
  },

  downpayment: {
    backgroundColor: "white",
    padding: 15,
    margin: 5,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  btnCal: {
    backgroundColor: "#2063e9",
    marginTop: 25,
    padding: 25,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  labelCal: {
    fontFamily: "Kanit_700Bold",
    fontSize: 20,
    color: "#FFFFFF",
  },
  downlabel: { fontFamily: "Kanit_500Medium", fontSize: 16 },
  downPaymentSelect: {
    backgroundColor: "#2063e9",
    color: "#FFFFFF",
  },
  downLabelSelect: {
    color: "#FFFFFF",
  },
  moneySelect: {
    backgroundColor: "#2063e9",
  },
  moneyLabelSelect: {
    color: "#FFFFFF",
  },
});
