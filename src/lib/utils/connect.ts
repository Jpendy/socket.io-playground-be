import mongoose from 'mongoose';
import { parse } from 'url';

export default function (url = process.env.MONGODB_URI!) {
    mongoose.connection.on('connected', () => {
        const parsedUrl = parse(url);
        const redactedUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}:${parsedUrl.port}${parsedUrl.pathname}`;
        console.log(`Connected to MongoDB at ${redactedUrl}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log('Disconnected from MongoDB');
    });

    mongoose.connection.on('error', () => {
        console.log('Error connecting to MongoDB');
    });

    return mongoose.connect(url);
};
