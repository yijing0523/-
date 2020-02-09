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
