const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asyn Operation#1')
        resolve(1)
    }, 2000)
})

const p2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('Asyn Operation#2')
        resolve(1)
    }, 4000)
})

//WhenAll
// Promise.all([p1, p1])
//     .then(result => console.log(result))
//WhenAny
Promise.race([p1, p2])
    .then(result => console.log(result))