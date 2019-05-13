import express from 'express'
import * as controllers from '../controllers/AppController'

const router = express.Router()

router.get('/', (req, res) => {
    res.send('it worked')
})
router.get('/quiz-length', controllers.totalQuizLength)
router.post('/start-quiz', controllers.startQuiz)
router.post('/submit-quiz', controllers.submitQuiz)

export default router