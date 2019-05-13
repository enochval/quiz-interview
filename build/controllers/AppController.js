'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.submitQuiz = exports.startQuiz = exports.totalQuizLength = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _fs = require('mz/fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startQuizschema = {
    noOfQuestions: _joi2.default.number().required()
};

var submitQuizschema = {
    fullName: _joi2.default.string().required(),
    email: _joi2.default.string().email().required(),
    phone: _joi2.default.number().required(),
    noOfQuestions: _joi2.default.number().required(),
    answersProvided: _joi2.default.array().items(_joi2.default.object().keys({
        questionID: _joi2.default.number().required(),
        optionSelected: _joi2.default.string().required()
    })).required()
};

var getValidationMessage = function getValidationMessage(errors) {
    return errors.details.map(function (error) {
        return error.message;
    });
};
var QUESTIONS_DB = _path2.default.join(__dirname, '../database/questions.json');
var ANSWERS_DB = _path2.default.join(__dirname, '../database/answers.json');

var getData = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var shuffle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var ids = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var file = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : QUESTIONS_DB;
        var data, questions, res;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.next = 2;
                        return _fs2.default.readFile(file);

                    case 2:
                        data = _context.sent;
                        questions = JSON.parse(data);

                        if (!(shuffle && limit)) {
                            _context.next = 8;
                            break;
                        }

                        return _context.abrupt('return', _lodash2.default.take(_lodash2.default.shuffle(questions), limit));

                    case 8:
                        if (!limit) {
                            _context.next = 12;
                            break;
                        }

                        return _context.abrupt('return', _lodash2.default.take(questions, limit));

                    case 12:
                        if (!shuffle) {
                            _context.next = 16;
                            break;
                        }

                        return _context.abrupt('return', _lodash2.default.shuffle(questions));

                    case 16:
                        if (!ids) {
                            _context.next = 22;
                            break;
                        }

                        res = [];

                        ids.forEach(function (element) {
                            var d = _lodash2.default.find(questions, function (o) {
                                return o._id == element;
                            });
                            res.push(d);
                        });
                        return _context.abrupt('return', res);

                    case 22:
                        return _context.abrupt('return', questions);

                    case 23:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function getData() {
        return _ref.apply(this, arguments);
    };
}();

var computeQuizResult = function computeQuizResult(answerObj, questionObj, noOfQuestions) {
    var correctAns = 0;
    answerObj.forEach(function (element) {
        var d = _lodash2.default.find(questionObj, function (o) {
            return o._id == element.questionID;
        });
        if (d.answer.toLowerCase() == element.optionSelected.toLowerCase()) {
            correctAns++;
        }
    });
    var percentageScore = parseInt(correctAns) / parseInt(noOfQuestions) * 100;
    var percentage = Number.isInteger(percentageScore) ? percentageScore + '%' : percentageScore.toFixed(2) + '%';
    var response = {
        noOfCorrectAnswers: correctAns,
        percentageScore: percentage
    };
    return response;
};

var storeAnser = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(answer) {
        var data, json;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return getData(false, false, false, ANSWERS_DB);

                    case 2:
                        data = _context2.sent;

                        data.push(answer);
                        json = JSON.stringify(data);
                        _context2.next = 7;
                        return _fs2.default.writeFile(ANSWERS_DB, json);

                    case 7:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function storeAnser(_x5) {
        return _ref2.apply(this, arguments);
    };
}();

var totalQuizLength = exports.totalQuizLength = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(req, res) {
        var questions;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return getData();

                    case 2:
                        questions = _context3.sent;

                        res.json({
                            status: true,
                            data: questions.length
                        });

                    case 4:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function totalQuizLength(_x6, _x7) {
        return _ref3.apply(this, arguments);
    };
}();

var startQuiz = exports.startQuiz = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(req, res) {
        var _Joi$validate, error, value, noOfQuestions, questions;

        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _Joi$validate = _joi2.default.validate(req.body, startQuizschema, { abortEarly: false }), error = _Joi$validate.error, value = _Joi$validate.value;

                        if (!error) {
                            _context4.next = 5;
                            break;
                        }

                        res.status(422).json(getValidationMessage(error));
                        _context4.next = 10;
                        break;

                    case 5:
                        noOfQuestions = value.noOfQuestions;
                        _context4.next = 8;
                        return getData(true, noOfQuestions);

                    case 8:
                        questions = _context4.sent;

                        res.json({
                            status: true,
                            data: questions
                        });

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function startQuiz(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

var submitQuiz = exports.submitQuiz = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(req, res) {
        var _Joi$validate2, error, value, answersProvided, noOfQuestions, fullName, email, phone, ids, questions, _computeQuizResult, noOfCorrectAnswers, percentageScore, answerObj;

        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _Joi$validate2 = _joi2.default.validate(req.body, submitQuizschema, { abortEarly: false }), error = _Joi$validate2.error, value = _Joi$validate2.value;

                        if (!error) {
                            _context5.next = 5;
                            break;
                        }

                        res.status(422).json(getValidationMessage(error));
                        _context5.next = 15;
                        break;

                    case 5:
                        answersProvided = value.answersProvided, noOfQuestions = value.noOfQuestions, fullName = value.fullName, email = value.email, phone = value.phone;
                        ids = answersProvided.map(function (answer) {
                            return answer.questionID;
                        });
                        _context5.next = 9;
                        return getData(false, false, ids);

                    case 9:
                        questions = _context5.sent;
                        _computeQuizResult = computeQuizResult(answersProvided, questions, noOfQuestions), noOfCorrectAnswers = _computeQuizResult.noOfCorrectAnswers, percentageScore = _computeQuizResult.percentageScore;
                        answerObj = {
                            fullName: fullName,
                            email: email,
                            phone: phone,
                            answersProvided: answersProvided,
                            noOfCorrectAnswers: noOfCorrectAnswers,
                            percentageScore: percentageScore
                        };
                        _context5.next = 14;
                        return storeAnser(answerObj);

                    case 14:
                        res.json({
                            fullName: fullName,
                            percentageScore: percentageScore
                        });

                    case 15:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function submitQuiz(_x10, _x11) {
        return _ref5.apply(this, arguments);
    };
}();
//# sourceMappingURL=AppController.js.map