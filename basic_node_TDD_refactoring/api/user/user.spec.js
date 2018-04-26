const superTest = require('supertest');
const assert = require('assert');
const should = require('should');
const app = require('../../app');

/* 현재 user의 정보를 모두 가져온다. */
describe('GET /users', () => {
    describe('성공', () => {
        it('전체목록을 반환한다', done => {
            superTest(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    res.body.forEach(user => {
                        console.log(user);
                    });
                    done();
                })
        });
    });
});

/* id값에 해당되는 user정보 반환 */
describe('GET /users/:id', () => {

    /* 성공했을때의 Test */
    describe('성공', () => {
        /* id가 3인 user의 데이터를 요청. */
        it('해당 id 값을 가진 data를 반환한다', done => {
            superTest(app)
                .get('/users/3')
                .end((err, res) => {
                    console.log(res.body);
                    done();
                });
        })
    });

    /* 실패했을때의 Test*/
    describe('실패', () => {
        /* 해당 id값의 데이터가 존재 하지 않을 경우. */
        it('해당 id가 존재 하지 않을경우 404 Error을 반환합니다.', done => {
            superTest(app)
                .get('/users/100')
                .expect(404)
                .end(done);
        });

        /* id가 숫자가 아닌경우 400 Error 반환 */
        it('id가 숫자가 아닌경우 400 Error 반환', done => {
            superTest(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        });
    });
});


describe('POST /users', () => {

    /* 성공 */
    describe('성공', () => {

        // 3개를 한번에 처리하려고 한다.
        /* 제대로 값 저장이되면 201 상태코드를 반환한다 */
        /* 생성된 유저 객체를 반환한다 */
        /* 입력한 name을 반환한다 */
        it('값 저장 , 생성된객체 반환 , 입력한 name 반환 ', done => {
            superTest(app)
                .post('/users')
                .send({"id" : 5 , "name" : "yunjin"})
                .expect(201)
                .end((err, res) => {
                    done();
                });


        });
    });


    /* 실패 */
    describe('실패', () => {
        /* name 파라미터 누락시 400 Error를 반환 */
        it('name 파라미터 누락시 400 Error를 반환 ', done => {
            superTest(app)
                .post('/users')
                .send({"id" : 5 })
                .expect(400)
                .end(done);
        });

        /* name이 중복될 경우 409 Error를 반환 */
        it('name이 중복될 경우 409 Error를 반환', done => {
            superTest(app)
                .post('/users')
                .send({"id" : 1 , "name" : "yunjin"})
                .expect(409)
                .end(done);
        });
    });
});

describe('DELETE /users/:id', () => {
    /* 성공 */
    describe('성공', () => {
        /* 삭제 성공시 204 상태코드 응답 */
        it('해당 id를 가지고있는 user 삭제성공',  done => {
            superTest(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        });
    });


    /* 실패 */
    describe('성공', () => {
        /* id가 숫자가 아닐경우 400으로 응답 */
        it('id가 숫자가 아닐경우 400으로 응답 ', done => {
            superTest(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        });
    });
});


describe('PUT /users/:id' , () => {

    /* 성공 */
    describe('성공', () => {
        /* 변경된 name값을 응답한다. */
        it('변경된 name값을 응답한다',  done => {
            superTest(app)
                .put('/users/1')
                .send({"name" : "YunJin"})
                .expect(200)
                .end( (err , res) => {


                    done();
                });
        });
    });

    /* 실패 */
    describe('실패', () => {
        /* 정수가 아닌 id 일 경우 400 응답 */
        it('id가 숫자가 아닐경우 400으로 응답 ', done => {
            superTest(app)
                .put('/users/one')
                .expect(400)
                .end(done);
        });

        /* name이 없을경우 400 응답 */
        it('name이 없을경우 400 응답 ', done => {
            superTest(app)
                .put('/users/1')
                .send({"id":1})
                .expect(400)
                .end(done);
        });

        /* 해당 id 값을 가진 user이 존재하지 않을경우 404 응답 */
        it('해당 id 값을 가진 user이 존재하지 않을경우 404 응답', done => {
            superTest(app)
                .put('/users/10')
                .send({"id" : 10 , "name" : "Vinus"})
                .expect(404)
                .end(done);
        });

        /* 이름이 중복일 경우 409 응답 */
        it('이름이 중복일 경우 409 응답', done => {
            superTest(app)
                .put('/users/2')
                .send({"id":2,"name": "James"})
                .expect(409)
                .end(done);
        });
    });
});