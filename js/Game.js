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