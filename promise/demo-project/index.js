// Promise() 同步 executer 同步
// const p =  new Promise((resolve, reject) => {

// })

// // 异步 能否同步？
// p.then((res) => {

// })

// -------------------------- 问题： 为什么Promise执行是同步，p.then是异步？
// Promise存在的意义是什么？
 
// 要知道上面的答案：
// 这里先用jquery来做演示

// 异步程序  跟下面的console.log是没有任何关系的，是异步的关系，但是还是先执行这个ajax请求，再执行console.log("I am a crazy guy!"); 
// 只不过前者执行是有时间的，后者先执行完毕
// $.ajax({
//     url: "http://localhost:3000/data.json",
//     success: function(data){
//         console.log(getNames(data));
//     }
// })

// console.log("I am a crazy guy!");

// // ------------------------ 现在的需求： 就是要拿到data.json数据中name的集合
// function getNames(data){
//     return data.map((v) => v.name);
// }

// 执行结果：
// I am a crazy guy!
// ["zhangsan", "lisi", "wangwu"]

// -------------------------- 需求改变：
// 现在要将success回调函数中的逻辑分离出来

// 如果改成如下样子： 是接受不到data的
// var data = $.ajax({
//     url: "http://localhost:3000/data.json",
//     async: false, // 将异步变成同步程序
// })

// console.log(getNames(data.responseJSON));
// // 上面的ajax请求与回调函数中的逻辑是同步关系，也就是业务逻辑分离出来，但是有个问题，就是也导致ajax与下面的程序形成了同步关系， 形成了阻塞。
// // 此时的打印结果：
// // ["zhangsan", "lisi", "wangwu"]
// // VM3296:1 I am a crazy guy!


// console.log("I am a crazy guy!");

// // 现在的需求： 就是要拿到data.json数据中name的集合
// function getNames(data){
//     return data.map((v) => v.name);
// }

// ---------------------------- 正是由于上面的问题，【将ajax请求的逻辑分离出来，而导致的ajax请求与所有的执行语句形成同步关系， 形成阻塞，而ajax本身是没办法解决的】
// 才出现了Promise， promise不是为了解决回调地狱的问题， 只是顺道解决了下， 而且并不是很优雅

// 使用Promise改造上面的程序如下：
// 同步  // 当然jquery ajax本身有promise的封装，这里没有使用
// const p =  new Promise((resolve, reject) => {
//     $.ajax({
//         url: "http://localhost:3000/data.json",
//         success: function(data){
//             resolve(data);
//         }
//     })
// })

// // 必须是异步，如果是同步，就回到上面ajax请求，async为false，阻塞后续所有程序的问题上， promise就没有必要了
// p.then((res) => {
//     console.log(getNames(res));
// })

// function getNames(data){
//     return data.map((v) => v.name);
// }

// console.log("I am a crazy guy!");

// 此时打印结果：
// I am a crazy guy!
// ["zhangsan", "lisi", "wangwu"]

// ------------------------  最终我们希望的执行顺序是这样的
// ajax
// getNames
// console
// 一步一步【一句一句】执行， 而且console语句跟上面的操作还没有关系

// 真正解决回调地狱的方案是： async/await + Promise
// 代码如下：

function getData(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:3000/data.json",
            success: function(data){
                resolve(data);
            }
        })
    })
}

async function doSth(){
    // 这里的处理是异步问题同步化
    const data = await getData();
    console.log(getNames(data));
}

doSth();

console.log("I am a crazy guy!");

function getNames(data){
    return data.map((v) => v.name);
}

// 此时的输出结果：
// I am a crazy guy!
// ["zhangsan", "lisi", "wangwu"]
