import React from 'react';
import { Box, Button, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 80,
        background: "#F6F8FA",
        height: 'calc(100vh - 160px)',
        "& .MuiFormLabel-root": {
            fontFamily: 'Poppins',
        },
        "& .MuiFormControlLabel-root": {
            margin: 0,
            width: '100%'
        }
    },
    mainBox: {
        border: "1px solid #94A3B8",
        padding: 40,
        borderRadius: 20
    },
    answerRadio: {
        marginTop: 10
    },
    radioLabelOutline: {
        background: "#FFF",
        padding: 8,
        borderRadius: 8,
        border: "1px solid #94A3B8",
    },
    radioLabelOutlinesucess: {
        background: "#FFF",
        padding: 8,
        borderRadius: 8,
        border: "1px solid #008000",
        backgroundColor: "#008000"
    },
    radioLabelOutlineFail: {
        background: "#FFF",
        padding: 8,
        borderRadius: 8,
        border: "1px solid #008000",
        backgroundColor: " #FF0000"
    },
    Textarea: {
        resize: 'none',
        fontFamily: 'Poppins',
        padding: 10,
        borderRadius: 10,
        fontSize: 14,
        outline: 'none',
        border: '1px solid #bdc2c8',
        width: "97%",
        height: 90,
        marginTop: 10
    },
    textDanger: {
        color: "#FF0000"
    },
    currectAns: {
        color: "#008000",
        fontSize: 20,
        fontWeight: 600
    }
}));

const Question = (props) => {
    const { onsubmit, onChangeRadio, errorFlag, allData, perview } = props
    const classes = useStyles()
    return (
        <Box className={classes.root}>
            <Box className={classes.mainBox}>
                <Grid container spacing={3}>
                    {allData?.map((obj, index) => {
                        if (obj.attributes.question_type === "radio") {
                            return (
                                <Grid item xs={12} key={index}>
                                    <FormLabel><Box component={"span"}>{index + 1}.{"   "}</Box>{obj.attributes.question}</FormLabel>
                                    <RadioGroup
                                        data-test-id="question-type-radio"
                                        className={classes.answerRadio}
                                        row={true}
                                        onChange={(event) => { onChangeRadio(event, index, obj) }}
                                        value={parseInt(obj.final_answer)}
                                    >
                                        <Grid container spacing={3}>
                                            {obj.attributes.answers.map((answerList, answerListIndex) => {
                                                console.log(obj?.checked, "answerList?.checked");
                                                return (
                                                    <Grid item xs={12} md={6} lg={3} key={answerListIndex}>
                                                        <Box className={(perview && obj.final_answer === obj.answer && answerList.id === parseInt(obj.final_answer)) ? classes.radioLabelOutlinesucess : (perview && obj.final_answer !== obj.answer && answerList.id === parseInt(obj.final_answer)) ? classes.radioLabelOutlineFail : classes.radioLabelOutline}>
                                                            <FormControlLabel value={answerList.id} control={<Radio color="default" key={answerList.id} />} label={<span className="radio-label-inner">{answerList.answer}</span>} />
                                                        </Box>
                                                        {perview && obj.final_answer !== obj.answer && answerList.id === parseInt(obj.final_answer) && <Typography className={classes.currectAns}>{`Currect Answer: ${obj.currect_answer}`}</Typography>}
                                                    </Grid>
                                                )
                                            })}
                                        </Grid>
                                        {!obj.final_answer && errorFlag && <div className={classes.textDanger}>Choose Option.</div>}
                                    </RadioGroup>
                                </Grid>
                            )
                        }
                    })}
                </Grid>
            </Box>

            <Grid container spacing={2} justifyContent='flex-end' style={{ margin: "20px 0" }}>
                <Grid item>
                    <Button variant='outlined' onClick={() => onsubmit()}>Submit</Button>
                </Grid>
            </Grid>
        </Box >
    );
}

export default Question;
