angular.module('socialApp').controller('myCanvasCtrl', function ($scope, $q) {

    $scope.$on('currentUser', function (UserAction, UserObj) {
        $scope.CurrentUser = UserObj;
    });

    $scope.$watch(function (scope) {
            return scope.CurrentUser
        },
        function (newValue, oldValue) {
            console.log('canvasCtrl' + newValue);
            if (newValue) {
                console.log("Canvas CurrentUser Profile pic  " + $scope.CurrentUser[0].profilePic);
                $scope.img2src = $scope.CurrentUser[0].profilePic;
                tempCanvas2().then(function (response) {
                    $scope.pattern2 = response;
                    drawCanvas();
                });
                tempCanvasMini().then(function(response){
                    $scope.patternMini = response;
                    drawCanvasMini();
                });
            } else {
                console.log('else{ for blank image');
                $scope.img2src = "/images/blank.jpg";
                tempCanvas2().then(function (response) {
                    console.log(response);
                    $scope.pattern2 = response;
                    drawCanvas();
                });
                tempCanvasMini().then(function(response){
                    $scope.patternMini = response;
                    drawCanvasMini();
                });
            }
        }
    );

    var drawCanvasMini = function () {
        var canvasProfile = document.getElementById('canvasProfile');
        canvasProfile.height = 40;
        canvasProfile.width = 40;

        var ctx = canvasProfile.getContext('2d');
        ctx.clearRect(0, 0, canvasProfile.width, canvasProfile.height);

        var pattern = ctx.createPattern($scope.patternMini, 'no-repeat');

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(1,2);
        ctx.lineTo(20,36);
        ctx.lineTo(39,2);
        ctx.closePath();
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = pattern;
        ctx.fill();
        ctx.fillStyle = "rgba(116, 253, 242, 0.80)";
        ctx.fill();
        ctx.restore();
    };

    var drawCanvas = function () {
        var canvas = document.getElementById('canvas');
        canvas.height = 500;
        canvas.width = 400;

        // use getContext to use the canvas for drawing
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        tempCanvas1().then(function (response) {
            console.log("tempCanvas1 Promise returned " + response);
            var pattern1 = ctx.createPattern(response, 'no-repeat');
            console.log('$scope.pattern2 ' + $scope.pattern2);
            var pattern2 = ctx.createPattern($scope.pattern2, 'no-repeat');

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(355, 300);
            ctx.lineTo(205, 26);
            ctx.lineTo(10, 270);
            ctx.closePath();
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = pattern1;
            ctx.fill();
            ctx.fillStyle = "rgba(234, 234, 234, 0.80)";
            ctx.fill();
            ctx.restore();

            ctx.save();
            ctx.beginPath();
            ctx.moveTo(340, 165);
            ctx.lineTo(210, 440);
            ctx.lineTo(14, 215);
            ctx.closePath();
            ctx.globalAlpha = 0.95;
            ctx.fillStyle = pattern2;
            ctx.fill();
            ctx.fillStyle = "rgba(116, 253, 242, 0.80)";
            ctx.fill();
            ctx.restore();
        });
    };

    function tempCanvas1() {
        var defer = $q.defer();
        var tempCanvas = document.createElement("canvas"),
            tCtx = tempCanvas.getContext("2d");
        tempCanvas.height = 340;
        tempCanvas.width = 380;
        var img = new Image();
        img.src = "https://lh3.googleusercontent.com/ZWmuJuXIKQ4jWvZniwhVci-VMUliBQbTnQ1kM3nU3tAdfj4R_WgPrL61JlFwjK39Nw=w300";
        img.onload = function () {
            tCtx.drawImage(img, 0, 0, img.width, img.height, 0, 0, 380, 340);
            defer.resolve(tempCanvas);
        };
        return defer.promise;
    }

    function tempCanvas2() {
        var defer = $q.defer();
        var temp2Canvas = document.createElement("canvas"),
            tCtx2 = temp2Canvas.getContext("2d");
        temp2Canvas.height = 500;
        temp2Canvas.width = 400;
        $scope.img2 = new Image();
        $scope.img2.src = $scope.img2src || "/images/blank.jpg";
        $scope.img2.onload = function () {
            tCtx2.drawImage($scope.img2, 0, 0, $scope.img2.width, $scope.img2.height, 10, 130, 335, 310);
            defer.resolve(temp2Canvas);
        };
        return defer.promise;
    }

    function tempCanvasMini() {
        var defer = $q.defer();
        var tempCanvas = document.createElement("canvas"),
            tCtx = tempCanvas.getContext("2d");
        tempCanvas.width = 40;
        tempCanvas.height = 40;
        $scope.img2 = new Image();
        $scope.img2.src = $scope.img2src;
        $scope.img2.onload = function () {
            tCtx.drawImage($scope.img2, 0, 0, $scope.img2.width, $scope.img2.height, 0, 0, 40, 40);
            defer.resolve(tempCanvas);
        };
        return defer.promise;
    }
});