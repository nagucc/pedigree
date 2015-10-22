var ConceptMiddleware = require('nagu-concepts').Middleware;
var neo = require('neo4j');

var Middleware = ConceptMiddleware.extend({
	create: function(url){
		this.neo_url = url;
		this.db = new neo.GraphDatabase({url:url});
		this.cm = new ConceptManager(url);
	},

	addFather: function () {
		var self = this;
		return function (req, res, next) {
			
		}
	}
});

module.exports = Middleware;