var cy = require('cypher-utils');

var ConceptManager = require('nagu-concepts').ConceptManager;
var Person = require('./person');

var PersonManager = ConceptManager.extend({
	/*
	构造函数
	*/
	create: function(url){
		ConceptManager.prototype.create.apply(this, arguments);
	},

	addNew: function(cb){
		var self = this;
		ConceptManager.prototype.addNew.apply(this, [function(err, concept){		// 首先创建新的Concept
			var query = [];														// 为Concept添加专门的标签：Person.LABEL
			query.push(cy.match('n'), 
				cy.idFilter('n', concept.id), 
				cy.addLabels('n', [Person.LABEL]));
			self.db.cypher({ query: query.join('\n')}, function (err, result) {
				cb(err, self.fromConcept(concept));
			});
		}]);
	},

	get: function (id, cb) {
		var self = this;
		ConceptManager.prototype.get.apply(this, [id, function (err, concept) {
			var person = self.fromConcept(concept);
			person.labels = concept.labels;
			person.properties = concept.properties;
			cb(err, person);
		}]);
	},

	fromConcept: function (concept) {
		return new Person(concept.url, concept.id);
	}
});

module.exports = PersonManager;