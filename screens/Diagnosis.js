import { LinearGradient } from "expo-linear-gradient";
import React, { useRef, useCallback, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import ButtonPrimary from "../components/button-primary";
import { COLORS, FONTS, SIZES, certainty } from "../constants";

import { useSelector, useDispatch } from "react-redux";
import { getGejala, calculateDiagnosis } from "../store/actions";
import RoundButton from "../components/round-button";

const Diagnosis = ({ navigation }) => {
  // States
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const allGejala = useSelector((state) => state.penyakit.allGejala);
  const userId = useSelector((state) => state.auth.user.userId);
  const penyakit = useSelector((state) => state.penyakit.allPenyakit);

  const dispatch = useDispatch();

  // Refs
  const scrollViewRef = useRef(null);

  useEffect(() => {
    console.log(questionIndex);
    console.log(answers);
    dispatch(getGejala());
  }, []);

  const RenderButton = useCallback(({ item, ...props }) => {
    return (
      <ButtonPrimary
        style={{
          backgroundColor: item.color,
          paddingHorizontal: 25,
          paddingVertical: 15,
          margin: 5,
          // width: 100,
          // heigt: 50,
        }}
        {...props}
      >
        <Text
          style={{
            color: COLORS.white,
          }}
        >
          {item.name}
        </Text>
      </ButtonPrimary>
    );
  }, []);

  const renderQuestions = useCallback(({ item }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          width: SIZES.width,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            textAlign: "center",
            ...FONTS.h1,
          }}
        >
          {item.question}
        </Text>
      </View>
    );
  }, []);

  // Handler
  const onScrollHandler = useCallback(
    (e) => {
      let page = Math.round(
        parseFloat(e.nativeEvent.contentOffset.x / SIZES.width)
      );

      setQuestionIndex(page);

      console.log(page);
    },
    [questionIndex]
  );

  const onClickHandler = (item) => {
    // Update questionIndex if index less than data
    if (questionIndex < allGejala.length - 1) {
      // console.log(DATA.length);
      let index = questionIndex;
      scrollViewRef.current.scrollToIndex({
        index: index + 1,
        animated: true,
      });
      setQuestionIndex((prevIndex) => prevIndex + 1);
    }

    const answerFound = answers.findIndex(
      (answer) => answer.gejalaId == allGejala[questionIndex].gejalaId
    );

    if (answerFound > -1) {
      setAnswers((prevAnswers) => {
        prevAnswers[answerFound].cfu = item.cf;
        return prevAnswers;
      });
    } else {
      setAnswers((prevAnswers) => {
        prevAnswers = [
          ...prevAnswers,
          {
            gejalaId: allGejala[questionIndex].gejalaId,
            cfu: item.cf,
          },
        ];
        return prevAnswers;
      });
    }

    // set
    // console.log(questionIndex);
    // console.log(item);
  };

  const onSubmit = () => {
    const data = {
      userId,
      gejala: answers,
    };

    dispatch(calculateDiagnosis(data));
    scrollViewRef.current.scrollToIndex({
      index: 0,
      animated: true,
    });
    setQuestionIndex(0);
    setAnswers([]);
    navigation.navigate("DiagnosisResult");
  };

  console.log(answers);
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.white]}
      style={styles.container}
    >
      {/* Questions */}
      <View style={styles.question}>
        <FlatList
          data={allGejala}
          keyExtractor={(item) => item.gejalaId.toString()}
          scrollEventThrottle={32}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          renderItem={renderQuestions}
          // onScroll={onScrollHandler}
          onMomentumScrollEnd={onScrollHandler}
          ref={scrollViewRef}
        />
      </View>

      {/* Question Indicator */}
      <View>
        <Text style={{ ...FONTS.h4, color: COLORS.white }}>
          {questionIndex + 1} / {allGejala.length}
        </Text>
      </View>

      {/* Answers */}
      <View style={styles.answerContainer}>
        {certainty.map((c, idx) => (
          <RenderButton item={c} key={idx} onPress={() => onClickHandler(c)} />
        ))}
        {/* {certainty.map((c, idx) => renderButton(c, idx))} */}
      </View>

      {allGejala.length === questionIndex + 1 ? (
        <RoundButton
          style={{
            position: "absolute",
            bottom: 70,
            right: 30,
            backgroundColor: COLORS.green,
          }}
          onPress={() => onSubmit()}
        >
          <FontAwesome name="check" size={34} color="white" />
        </RoundButton>
      ) : null}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  question: {
    flex: 2,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: COLORS.red,
  },
  answerContainer: {
    flex: 1,
    width: "100%",
    // backgroundColor: COLORS.red,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    paddingBottom: 80,
  },
});

export default Diagnosis;
