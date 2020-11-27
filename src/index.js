
import ExpressLoader from './loaders/ExpressLoader'
// import MongoLoader from './loaders/MongoLoader'
import env from 'dotenv'
env.config()
class App{
    static async run()
    {
        //Run chuong trinh
        await Promise.all(
            [
                new ExpressLoader().boot(),
                // new MongoLoader().boot()
            ]
        )
    }
}

App.run()