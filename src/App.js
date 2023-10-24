import './App.css';
import data from "./data.json"
import { useEffect, useState } from 'react';
import Question from './pages/Question';
import ResultModel from './pages/ResultModel';
import { Box } from '@material-ui/core';

function App() {
  const [allData, setAllData] = useState([])
  const [errorFlag, setErrorFlag] = useState(false)
  const [open, setOpen] = useState(false);
  const [perview, setPerview] = useState(false);
  const [viewResult, setViewResult] = useState(0);

  useEffect(() => {
    let finalData = data.data.attributes.questions.data.map((obj) => {
      switch (obj.attributes.question_type) {
        case "multiple_select":
          return {
            ...obj,
            attributes: {
              ...obj.attributes,
              answers: obj.attributes.answers.map((sub, index) => {
                return {
                  ...sub,
                  checked: false,
                };
              }),
            },
            final_answer: [],
          };
        case "subjective":
          return {
            ...obj,
            final_answer: "",
          };
        default:
          return {
            ...obj,
            final_answer: "",
          };
      }
    });
    setAllData(finalData)
  }, [])

  const onChangeRadio = (event, index, data) => {
    let finalAns = allData.map((obj, ind) => {
      if (index === ind) {
        return ({
          ...obj,
          final_answer: event.target.value,
          checked: event.target.checked
        })
      } else {
        return obj
      }
    })
    setAllData(finalAns)
  }

  const onsubmit = () => {
    const validate = allData.filter((item) => !item.final_answer?.length);
    if (validate.length) {
      setErrorFlag(true)
    } else {
      let finalData = allData.filter((item) => item.final_answer === item.answer)
      setOpen(true)
      setViewResult(finalData.length * 100 / allData.length)
    }
  }

  const handleClose = () => {
    setOpen(false);
    setPerview(true)
  }

  return (
    <Box>
      <Question
        onsubmit={onsubmit}
        onChangeRadio={onChangeRadio}
        errorFlag={errorFlag}
        allData={allData}
        perview={perview}
      />
      <ResultModel handleClose={handleClose} viewResult={viewResult} open={open} />
    </Box>
  );
}

export default App;
