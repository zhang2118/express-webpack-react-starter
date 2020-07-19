import mongodb from 'mongodb';

const DbConnection = () => {
    let db = null;

    const connect = async () => {
        try {
            return await mongodb.MongoClient.connect('mongodb://localhost:27017/repack-starter');
        } catch (error) {
            console.error(error.reason);
        }
    };
    
    const getConnection = async () => {
        try {
            if (db === null) {
                db = await connect();
            }
            return db;
        } catch (error) {
            console.log(error);
        }
    }

    return {
        getConnection: getConnection
    }
};

export default DbConnection();