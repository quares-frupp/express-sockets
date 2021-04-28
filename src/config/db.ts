import mongoose from "mongoose";

export default async function connectToDb(dbHost: string, dbDatabase: string) {
    const dbUrl = makeDbUrl(dbHost, dbDatabase);

    await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const db = await mongoose.connection;
    console.log("Connected to DB");
    db.on("error", console.error.bind(console, "MongoDB Connection Error:"));
}

function makeDbUrl(dbHost: string, dbDatabase: string) {
    return `mongodb://${dbHost}/${dbDatabase}`
}
