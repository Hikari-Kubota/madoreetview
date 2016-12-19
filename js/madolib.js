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

    var view = function(id) {
        var width = window.innerWidth, height = window.innerHeight;
        //scene
        var scene = new THREE.Scene();
        //mesh
        var geometry = new THREE.SphereGeometry(5, 60, 40);
        geometry.scale(-1, 1, 1);

        var material = new THREE.MeshBasicMaterial( {
            map: THREE.ImageUtils.loadTexture( 'https://raw.githubusercontent.com/Hikari-Kubota/madoreetview/master/imgs/theta'+id+'.jpg' )
        });

        sphere = new THREE.Mesh( geometry, material );
        scene.add( sphere );

        //camera
        var camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
        camera.position.set(0,0,0.1);
        camera.lookAt(sphere.position);

        //helper
        var axis = new THREE.AxisHelper(1000);
        axis.position.set(0,0,0);
        scene.add(axis);

        //render
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width,height);
        renderer.setClearColor({color: 0x000000});
        document.getElementById('viewer').appendChild(renderer.domElement);
        renderer.render(scene,camera);

        //control
        var controls = new THREE.OrbitControls(camera,renderer.domElement);

        function render(){
            requestAnimationFrame(render);
            //sphere.rotation.y += 0.05 * Math.PI/180;
            //画面リサイズ対応
            window.addEventListener( 'resize', onWindowResize, false );
            renderer.render(scene,camera);
            controls.update();
        }
        render();


        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }
        /*
        // シーンの作成
        var scene = new THREE.Scene();
        // カメラの作成
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        // レンダラーの作成
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement ); // body にcanvas要素として描画エリアを追加

        // 球体の形状を作成
        var geometry = new THREE.SphereGeometry(1, 100, 100);

        // 画像をテクスチャとして読み込み
        var texture = new THREE.ImageUtils.loadTexture("https://raw.githubusercontent.com/Hikari-Kubota/madoreetview/master/imgs/theta1.jpg");
        texture.minFilter = THREE.LinearFilter;
        texture.flipY = false;

        // テクスチャを使い、マテリアル(質感)を作成
        var material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0xFFFFFF, specular: 0xcccccc, shininess:50, ambient: 0xffffff,
            map:texture
        });

        // 球体(形状)にマテリアル(質感)を貼り付けて物体を作成
        var mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x += Math.PI; // 球体を回転させ、方向を調整

        scene.add( mesh );
        var controls = new THREE.OrbitControls(camera,renderer.domElement);
        var render = function () {
            requestAnimationFrame(render);
            mesh.rotation.y = 0.003;
            renderer.render(scene, camera);
            controls.update();
        };

        render();
        */
    }
    return {
        initAngle: initAngle,
        setInitAngle: setInitAngle,
        view: view,
    }
})();