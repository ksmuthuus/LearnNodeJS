//Call back approach
// getCustomer(1, (customer) => {
//     console.log('Customer: ', customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log('Top movies: ', movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log('Email sent...')
//             });
//         });
//     }
// });

//Async and await approach
async function notifyCustomer() {
    try {
        const customer = await getCustomer(1)
        console.log(customer)
        if (!customer.isGold) return
        const topmovies = await getTopMovies()
        console.log(`Tope movies: ${topmovies}`)
        await sendEmail(customer.email, topmovies)
        console.log('Email sent!')
    } catch (err) {
        console.log(`Error: ${err.message}`)
    }
}
notifyCustomer()




function getCustomer(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                id: 1,
                name: 'Mosh Hamedani',
                isGold: true,
                email: 'email'
            });
        }, 4000);
    })
}

function getTopMovies() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(['movie1', 'movie2']);
        }, 4000);
    })
}


function sendEmail(email, movies) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 4000);
    })

}