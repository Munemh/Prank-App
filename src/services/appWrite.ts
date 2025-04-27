import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('680cf7c1003581f347a3');
    
const account: Account = new Account(client);
const databases: Databases = new Databases(client);
const storage: Storage = new Storage(client);

export { client, account, databases, storage };
