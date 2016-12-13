var graph = (function() {
    // グラフのモデルを定義したオブジェクト
    var nodeList = [
        {
            "id": 0,
            "adjNode": [1, 2],
            "coord": {x: 0.3, y: 0.5},
        }
    ];
    // 現在のノードを保持するオブジェクト
    var node = {
        id: null,
        adjNode: [], // 隣接ノード
        coord: {x: null, y: null},
    }

    /**
     * public setNode 現在のノードの値をセット
     *
     * @param {number} id ノードID
     */
    var setNode = function(id) {
        this.node = this.nodeList[id];
    }

    /**
     * public getRelativeVector 2つのノードの位置関係を表すベクトルを計算
     *
     * @param {node} nodeFrom 始点ノード
     * @param {node} nodeTo   終点ノード
     *
     * return vector {x, y}
     */
    var getRelativeVector = function(nodeFrom, nodeTo) {

        return {x: (nodeTo.coord.x - nodeFrom.coord.x) ,y: (nodeTo.coord.y - nodeFrom.coord.y)};
    }

    /**
     * public getDegreeFromVecvtor ベクトルとx軸のなす角(degree)を計算
     *
     * @param {vector} vec ベクトル
     *
     * return degree
     */
    var getDegreeFromVector = function(vec) {

        return Math.atan2(vec.x, vec.y) * 180 / Math.PI;
    }

    return {
        nodeList: nodeList,
        node: node,
        setNode: setNode,
        getRelativeVector: getRelativeVector,
        getDegreeFromVector: getDegreeFromVector,
    }
})();

var image = (function() {
    // 画像の初期角度(degree)を保持する変数
    var initAngle = null;

    /**
     * public setInitAngle 画像の初期角度(degree)をセット
     *
     * @param {float} degree
     */
     var setInitAngle = function(deg) {
        this.initAngle = deg;
     }

    return {
        initAngle: initAngle,
        setInitAngle: setInitAngle,
    }
})();