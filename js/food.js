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
        remove (map);
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
        list.push ( div1);
    }

    // 删除旧食物的函数div
    function remove ( map ) {
        for(let i = 0 ; i < list.length ; i++) {
            map.removeChild (list[i]);
        }
        // 清空数组
        list = [ ] ;
    }
    //  暴露方法
    w.Food = Food;
})(window);