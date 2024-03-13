import { Client, Account, Databases } from 'appwrite';

export const client = new Client();

client
    .setEndpoint(`${process.env.NEXT_PUBLIC_URL}`)
    .setProject(`${process.env.NEXT_PUBLIC_ID}`); 

export const account = new Account(client);
export const database = new Databases(client)
export { ID } from 'appwrite';

