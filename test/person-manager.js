/* global process */
/* global it */
/* global describe */
var should = require("should");
var PersonManager = require('../lib/person-manager');
var Person = require('../lib/person');
var EventProxy = require('eventproxy');

var url = process.env.NEO_HOST || 'http://neo4j.ynu.edu.cn';
console.log('url: ' + url);
var pm = new PersonManager(url);

describe('Person model test', function () {

	var person = null;
	it('addNew & retrieve', function (done) {
		this.timeout(15000);														// 延长超时时间
		pm.addNew(function (err, concept) {
			pm.get(concept.id, function (err, concept) {
				person = concept;
				should.not.exist(err);
				concept.id.should.above(-1);
				concept.labels.indexOf(Person.LABEL).should.above(-1);
				(concept instanceof Person).should.be.true;
				done();
			});
		});
	});
	
	var father = null;
	it('addFather', function (done){
		this.timeout(15000);
		pm.addNew(function (err, concept) {
			father = concept;
			person.addFather(father, function(err, result){
				should.not.exist(err);
				done();
			});
		});
	});

	var mother = null;
	it('addMother', function (done) {
		this.timeout(15000);
		pm.addNew(function (err, concept) {
			mother = concept;
			person.addMother(mother, function(err, result){
				should.not.exist(err);
				done();
			});
		});
	});

	var couple = null;
	it('addCouple', function (done) {
		this.timeout(15000);
		pm.addNew(function (err, concept) {
			couple = concept;
			person.addCouple(couple, function(err, result){
				should.not.exist(err);
				done();
			});
		});
	});

	it('detail.存在数据', function (done) {
		this.timeout(15000);
		person.detail(function (err, detail) {
			should.not.exist(err);
			detail.fathers.length.should.eql(1);
			detail.fathers[0].id = father.id;
			detail.fathers[0].labels.indexOf(Person.LABEL).should.above(-1);

			detail.mothers.length.should.eql(1);
			detail.mothers[0].id = mother.id;
			detail.mothers[0].labels.indexOf(Person.LABEL).should.above(-1);

			detail.couples.length.should.eql(1);
			detail.couples[0].id = couple.id;
			detail.couples[0].labels.indexOf(Person.LABEL).should.above(-1);
			done();
		});
	});

	it('removeFather', function (done) {
		this.timeout(15000);
		person.removeFather(father, function (err, result) {
			should.not.exist(err);
			done();
		});
	});

	it('removeMother', function (done) {
		this.timeout(15000);
		person.removeMother(mother, function (err, result) {
			should.not.exist(err);
			done();
		});
	});

	it('removeCouple', function (done) {
		this.timeout(15000);
		person.removeCouple(couple, function (err, result) {
			should.not.exist(err);
			done();
		});
	});

	it('detail.数据不存在', function (done) {
		this.timeout(15000);
		person.detail(function (err, detail) {
			should.not.exist(err);
			detail.fathers.length.should.eql(0);
			detail.mothers.length.should.eql(0);
			done();
		});
	});	

	after(function (done) {			// 须使用done等待结束，否则会导致节点不能删除
		this.timeout(15000);
		var ep = new EventProxy();
		ep.all('person','father', 'mother', 'couple', function () {
			done();
		});
		pm.del(person, ep.done('person'));
		pm.del(father, ep.done('father'));
		pm.del(mother, ep.done('mother'));
		pm.del(couple, ep.done('couple'));
	});
});