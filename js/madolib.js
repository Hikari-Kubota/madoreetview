var graph = (function(){
	var nodeList = [
		1,2,3
	];
	var node = {
		id: null,
		adjNode: [], // 隣接ノード
		coord: {x: 2, y: null},
	}

	return {
		nodeList: nodeList,
		node: node,
	}
})();

var image = (function(){
	var test = graph.node.coord.x;

	return {
		test: test,
	}
})();