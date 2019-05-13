'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _AppController = require('../controllers/AppController');

var controllers = _interopRequireWildcard(_AppController);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.get('/', function (req, res) {
    res.send('it worked');
});
router.get('/quiz-length', controllers.totalQuizLength);
router.post('/start-quiz', controllers.startQuiz);
router.post('/submit-quiz', controllers.submitQuiz);

exports.default = router;
//# sourceMappingURL=index.js.map