// 游戏控制器---------------------------------------------------------
(function (w) {
    //声明一个变量that,就是用来保存游戏控制器对象的.
    let that = null;
    // 创建游戏控制构造函数

    function game(map) {
        this.senker = new Senker();
        this.food = new Food();
        this.map = map;
        that = this;
    }
    // 创造为原型
    game.prototype.staer = function () {
        // 调用食物
        this.food.rander(this.map);
        // 调用蛇
        this.senker.rander(this.map);
        // // 蛇移动
        // this.senker.move();
        // // 新蛇创建新盒子
        // this.senker.rander(this.map);
        // 调用计时器,让蛇动起来
        stopmove();
        // 调用移动函数,让蛇被键盘控制起来
        bindKey()
    }

    // 写一个计时器,让蛇不停的动起来
    function stopmove() {
        let time = setInterval(
            function () {
                // 计时器里的this 是window ,我们需要改变this的属性,这里bind传值来修改this的属性
                // 蛇移动
                this.senker.move(this.food, this.map);
                // 判断蛇的移动范围
                // 先把X , Y 的坐标求出来
                let sheX = this.senker.body[0].X * this.senker.width;
                let sheY = this.senker.body[0].Y * this.senker.height;
                if (sheX < 0 || sheY < 0 || sheX >= this.map.offsetWidth || sheY >= this.map.offsetHeight) {
                    // 在判定找真,如果用一个是真,则进行以下代码
                    // 提醒用户游戏结束
                    alert('Game Over!');
                    // 结束计时器
                    clearInterval(time);
                    // 返回当前函数
                    return;
                }
                // 新蛇创建新盒子
                this.senker.rander(this.map);

            }.bind(that), 200);
    }

    // 封装函数 蛇移动的方向 
    function bindKey() {
        // 键盘控制方向事件
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 37:
                    if (this.senker.direction != 'right') {
                        this.senker.direction = 'left';
                    }
                    break;
                case 38:
                    if (this.senker.direction != 'bottom') {
                        this.senker.direction = 'top';
                    }
                    break;
                case 39:
                    if (this.senker.direction != 'left') {
                        this.senker.direction = 'right';
                    }
                    break;
                case 40:
                    if (this.senker.direction != 'top') {
                        this.senker.direction = 'bottom';
                    }
                    break;
            }
        }.bind(that);
    }


    // 改变
    w.game = game;
})(window);

// 蛇 ---------------------------------------------------------------------
(function (w) {
    //写蛇的代码
    //声明一个数组,用来保存老蛇div
    let list = [];
    // 创建蛇函数
    function Senker(width, height, direction) {
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        this.body = [
            { X: 3, Y: 1, bgcolor: 'red' },
            { X: 2, Y: 1, bgcolor: 'green' },
            { X: 1, Y: 1, bgcolor: 'pink' }
        ];
    }
    // 创建蛇原型
    Senker.prototype.rander = function (map) {
        // 调用函数
        remove(map);
        // 遍历body
        for (let i = 0; i < this.body.length; i++) {
            // 创建一个新的div
            let div = document.createElement('div');
            // 给div 赋值样式
            div.style.position = 'absolute';
            div.style.top = this.body[i].Y * this.height + 'px';
            div.style.left = this.body[i].X * this.width + 'px';
            div.style.backgroundColor = this.body[i].bgcolor;
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';

            // 将新建div添加到地图中
            map.appendChild(div);
            // 将新出来的div添加数组list
            list.push(div);
        }
    }
    //先改变除蛇头之外的蛇身的移动
    Senker.prototype.move = function (food, map) {
        for (let i = this.body.length - 1; i > 0; i--) {
            this.body[i].X = this.body[i - 1].X;
            this.body[i].Y = this.body[i - 1].Y;
        }
        // 改蛇头坐标
        switch (this.direction) {
            case 'right':
                this.body[0].X++;
                break;
            case 'left':
                this.body[0].X--;
                break;
            case 'top':
                this.body[0].Y--
                break;
            case 'bottom':
                this.body[0].Y++;
                break;
        }
        // 因为蛇移动一下就会产生新坐标,那新坐标就有可以吃到食物
        // 判断新坐标与食物坐标是否相等
        // 找到食物当前的新坐标X,Y 
        let foodX = food.X;
        let foodY = food.Y;
        // 找到蛇当前的新坐标
        let sheX = this.body[0].X * this.width;
        let sheY = this.body[0].Y * this.height;
        // 拿到蛇尾的坐标
        let lastshe = this.body[this.body.length - 1];
        // 判断,当蛇头与食物撞在一起后就会产生新的蛇身
        if (sheX == foodX && sheY == foodY) {
            // 在蛇原型里面添加新的蛇身
            this.body.push(
                {
                    X: lastshe.X,
                    Y: lastshe.Y,
                    bgcolor: getColorForRandom()
                }
            )
            // 产生一个新食物
            food.rander(map)
        }
    }



    // 删除老蛇蛇身 函数
    function remove(map) {
        for (let i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
        }
        // 数组清空
        list = [];
    }
    //随机产生一个十六进制的颜色的函数.
    function getColorForRandom() {
        var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];  //下标0-15
        var str = "#";
        //循环产生 6个 0-15的数.
        for (var i = 0; i < 6; i++) {
            var num = Math.floor(Math.random() * 16);
            //根据这个随机数,在arr数组中去取值.
            str += arr[num];
        }
        return str;   //"#98de00"
    }


    // 暴露函数
    w.Senker = Senker;
})(window);


// 食物 --------------------------------------------------------------
(function (w) {
    // 新建一个数组来保存食物
    let list = [];
    // 生成一个食物函数
    function Food(width, height, bgColor, X, Y) {
        this.width = width || 20;
        this.height = height || 20;
        this.bgColor = bgColor || 'green';
        this.X = X || 0;
        this.Y = Y || 0;
    }

    // 生成原型, 
    Food.prototype.rander = function (map) {
        remove(map);
        // 给X.Y 设置随机数
        this.X = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.Y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;
        // 创建一个新div
        let div1 = document.createElement('div');
        // 给div赋值样式
        div1.style.width = this.width + 'px';
        div1.style.height = this.height + 'px';
        div1.style.backgroundColor = this.bgColor;
        div1.style.position = 'absolute';
        div1.style.top = this.Y + 'px';
        div1.style.left = this.X + 'px';
        // 将新div添加到地图里面
        map.appendChild(div1);
        list.push(div1);
    }

    // 删除旧食物的函数div
    function remove(map) {
        for (let i = 0; i < list.length; i++) {
            map.removeChild(list[i]);
        }
        // 清空数组
        list = [];
    }
    //  暴露方法
    w.Food = Food;
})(window);