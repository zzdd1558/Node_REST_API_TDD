const superTest = require('supertest');
const should = require('should');
const app = require('./index');


describe('GET /user', () => {
    describe('성공', () => {
        /* 현재 user의 정보를 모두 가져온다. */
        it('전체목록을 반환한다', done => {
            superTest(app)
                .get('/user')
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


describe('GET /user/:id', () => {

    /* 성공했을때의 Test */
    describe('성공', () => {
        /* id가 3인 user의 데이터를 요청. */
        it('해당 id 값을 가진 data를 반환한다', done => {
            superTest(app)
                .get('/user/3')
                .end((err, res) => {
                    console.log(res.body);
                    done();
                });
        })
    });

    /* 실패했을때의 Test*/
    describe('실패', () => {
        /* 해당 id값의 데이터가 존재 하지 않을 경우. */
        it('해당 id가 존재 하지 않을경우 400error을 반환합니다.', done => {
            superTest(app)
                .get('/user/100')
                .expect(400)
                .end(done);
        });
    });
});