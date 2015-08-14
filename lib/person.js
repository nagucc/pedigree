
/*
Person类的特征
1. 默认标签为：Person
2. 继承自Concept
*/

var Concept = require('nagu-concepts').Concept;
var EventProxy = require('eventproxy');

var Person = Concept.extend({
	/*
	构造函数
	*/
	create: function(url, id) {
		Concept.prototype.create.apply(this, arguments);
	},

	/*
	获取当前Person的详细信息，包括name，desc，fathers, mothers等
	*/
	detail: function (cb) {
		var ep = new EventProxy();
		ep.all('names', 'descs', 'fathers', 'mothers', 'couples', 
			function (names, descs, fathers, mothers, couples) {
			cb(null, {
				names: names,
				descs: descs,
				fathers: fathers,
				mothers: mothers,
				couples: couples
			});
		});
		ep.fail(cb);

		this.names(ep.done('names'));
		this.descriptions(ep.done('descs'));

		this.getPvs({
			label: Person.HAS_FATHER
		}, ep.done('fathers'));
		this.getPvs({
			label: Person.HAS_MOTHER
		}, ep.done('mothers'));
		this.getPvs({
			label: Person.HAS_COUPLE
		}, ep.done('couples'));
	},

	/*
	添加father
	参数
		- father 父亲节点 Number || Concept
	*/
	addFather: function(father, cb){
		if(!(father instanceof Concept)) father = new Concept(this.url, father)
		this.addPv({
			label: Person.HAS_FATHER
		}, father, cb);
	},

	/*
	删除father
	参数
		- father 父亲节点 Number || Concept
	*/
	removeFather: function (father, cb) {
		if(!(father instanceof Concept)) father = new Concept(this.url, father)
		this.removePv({
			label: Person.HAS_FATHER
		}, father, cb);
	},

	/*
	添加mother
	参数
		- mother 母亲节点 Number || Concept
	*/
	addMother: function(mother, cb){
		if(!(mother instanceof Concept)) mother = new Concept(this.url, mother)
		this.addPv({
			label: Person.HAS_MOTHER
		}, mother, cb);
	},

	/*
	删除mother
	参数
		- mother 母亲节点 Number || Concept
	*/
	removeMother: function (mother, cb) {
		if(!(mother instanceof Concept)) mother = new Concept(this.url, mother)
		this.removePv({
			label: Person.HAS_MOTHER
		}, mother, cb);
	},

	/*
	添加couple
	参数
		- couple 配偶节点 Number || Concept
	*/
	addCouple: function(couple, cb){
		if(!(couple instanceof Concept)) couple = new Concept(this.url, couple)
		this.addPv({
			label: Person.HAS_COUPLE
		}, couple, cb);
	},

	/*
	删除couple
	参数
		- couple 配偶节点 Number || Concept
	*/
	removeCouple: function (couple, cb) {
		if(!(couple instanceof Concept)) couple = new Concept(this.url, couple)
		this.removePv({
			label: Person.HAS_COUPLE
		}, couple, cb);
	}
});

Person.static({
	LABEL: 'Person',
	HAS_FATHER: 'pedigree_hasFather',
	HAS_MOTHER: 'pedigree_hasMother',
	ISMALE: 'pedigree_isMale',
	HAS_COUPLE: 'pedigree_hasCouple',
	BOOLEAN_LABEL: 'Boolean'
});


module.exports = Person;