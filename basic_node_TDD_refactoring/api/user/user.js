const express = require('express');
const router = express.Router();
const user_ctrl = require('./user.ctrl');


// GET - 모든 user를 조회.
router.get('/', user_ctrl.index);

// GET - 해당 id 에 해당하는 값 조회
router.get('/:id', user_ctrl.show);

// POST - 넘어온 값으로 해당 데이터 추가
router.post('/', user_ctrl.create);

// PUT - 해당 id 에 해당하는 값의 name 을 update
router.put('/:id', user_ctrl.update);

// DELETE - 해당 id를 가지고 있는데이터 삭제
router.delete('/:id', user_ctrl.destroy);

module.exports = router;