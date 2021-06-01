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
import ButtonPrimary from "../components/button-primary";
import { COLORS, FONTS, SIZES } from "../constants";

import { useSelector, useDispatch } from "react-redux";
import { getGejala } from "../store/actions";

const DATA = [
  {
    gejalaId: 1,
    name: "Pungung sakit",
    desc: "lorem ipsum dolor",
  },
  {
    gejalaId: 2,
    name: "Muntah-muntah",
    desc: "lorem awee awee",
  },
  {
    gejalaId: 3,
    name: "Pusing",
    desc: "Sasdasdsad hoho hoho",
  },
];

const Home = ({ navigation }) => {
  // States
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const allGejala = useSelector((state) => state.penyakit.allGejala);

  const dispatch = useDispatch();

  // Refs
  const scrollViewRef = useRef(null);

  const certainty = useRef([
    {
      name: "Pasti",
      cf: 1.0,
      color: "#04c92f",
    },
    {
      name: "Hampir Pasti",
      cf: 0.8,
      color: "#00b87a",
    },
    {
      name: "Kemungkinan Besar",
      cf: 0.6,
      color: "#005ba1",
    },
    {
      name: "Kemungkinan",
      cf: 0.4,
      color: "#9da600",
    },
    {
      name: "Tidak tahu",
      cf: 0,
      color: "#8f0026",
    },
  ]).current;

  useEffect(() => {
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
          {item.name}
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

  const onClickHandler = useCallback(
    (item) => {
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
        (answer) => answer.gejalaId == allGejala[questionIndex].id
      );

      if (answerFound > -1) {
        console.log("Answer found");
        setAnswers((prevAnswers) => {
          prevAnswers[answerFound].cfu = item.cf;
          return prevAnswers;
        });
      } else {
        console.log("Answer not found");
        setAnswers((prevAnswers) => {
          return (prevAnswers = [
            ...prevAnswers,
            {
              gejalaId: allGejala[questionIndex].id,
              cfu: item.cf,
            },
          ]);
        });
      }

      // set
      // console.log(questionIndex);
      // console.log(item);
    },
    [questionIndex, scrollViewRef, answers]
  );

  console.log(answers);
  return (
    <LinearGradient
      colors={[COLORS.secondary, COLORS.white]}
      style={styles.container}
    >
      {/* Questions */}
      <View style={styles.question}>
        <View style={{}}>
          <Text>Hello</Text>
        </View>
        <FlatList
          data={allGejala}
          keyExtractor={(item) => item.id.toString()}
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

export default Home;
