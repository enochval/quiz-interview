import _ from 'lodash'
import Joi from 'joi'
import fs from 'mz/fs'
import path from 'path'

const startQuizschema = {
    noOfQuestions: Joi.number().required(),
};

const submitQuizschema = {
    fullName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),
    noOfQuestions: Joi.number().required(),
    answersProvided: Joi.array().items(Joi.object().keys({
        questionID: Joi.number().required(), 
        optionSelected: Joi.string().required()
    })).required(),
};

const getValidationMessage = (errors) => {
    return errors.details.map((error) => error.message)
}
const QUESTIONS_DB = 'database/questions.json'
const ANSWERS_DB = 'database/answers.json'

const getData = async (shuffle = false, limit = false, ids = false, file = QUESTIONS_DB) => {
    const data = await fs.readFile(path.join(file))
    const questions = JSON.parse(data)
    if (shuffle && limit) {
        return _.take(_.shuffle(questions), limit)
    } else if (limit) {
        return _.take(questions, limit)
    } else if (shuffle) {
        return _.shuffle(questions)
    } else if (ids) {
        let res = []
        ids.forEach(element => {
            const d = _.find(questions, (o) => o._id == element )
            res.push(d)
        })
        return res
    } else {
        return questions
    }
}

const computeQuizResult = (answerObj, questionObj, noOfQuestions) => {
    let correctAns = 0;
    answerObj.forEach(element => {
        const d = _.find(questionObj, (o) => o._id == element.questionID )
        if (d.answer.toLowerCase() == element.optionSelected.toLowerCase()) {
            correctAns++
        }
    })
    const percentageScore = (parseInt(correctAns) / parseInt(noOfQuestions)) * 100
    const percentage = (Number.isInteger(percentageScore)) ? `${percentageScore}%` :
                        `${percentageScore.toFixed(2)}%`
    const response = {
        noOfCorrectAnswers: correctAns,
        percentageScore: percentage
    }
    return response;
}

const storeAnser = async (answer) => {
    const data = await getData(false, false, false, ANSWERS_DB)
    data.push(answer)
    const json = JSON.stringify(data)
    await fs.writeFile(path.join(ANSWERS_DB), json)
}

export const totalQuizLength = async (req, res) => {
    const questions = await getData()
    res.json({
        status: true,
        data: questions.length
    })
}

export const startQuiz = async (req, res) => {
    const {error, value} = Joi.validate(req.body, startQuizschema, { abortEarly: false });
    if (error) {
        res.status(422).json(getValidationMessage(error))
    } else {
        const { noOfQuestions } = value
        const questions = await getData(true, noOfQuestions)
        res.json({
            status: true,
            data: questions
        })
    }
}

export const submitQuiz = async (req, res) => {
    const {error, value} = Joi.validate(req.body, submitQuizschema, { abortEarly: false });
    if (error) {
        res.status(422).json(getValidationMessage(error))
    } else {
        const { answersProvided, noOfQuestions, fullName, email, phone } = value
        const ids = answersProvided.map(answer => {
            return answer.questionID
        })

        const questions = await getData(false, false, ids)
        const { noOfCorrectAnswers, percentageScore } = computeQuizResult(answersProvided, questions, noOfQuestions)

        const answerObj = {
            fullName,
            email,
            phone,
            answersProvided,
            noOfCorrectAnswers,
            percentageScore
        }
        await storeAnser(answerObj)
        res.json({
            fullName,
            percentageScore
        })
    }
}