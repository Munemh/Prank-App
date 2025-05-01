import { Client, Account, Databases, Storage } from 'appwrite';

if (!process.env.EXPO_PUBLIC_APP_WRITE_ENDPOINT || !process.env.EXPO_PUBLIC_PROJECT_ID) {
  throw new Error('Missing config. Check .env file.');
}
const client = new Client();
client
  .setEndpoint(process.env.EXPO_PUBLIC_APP_WRITE_ENDPOINT)
  .setProject(process.env.EXPO_PUBLIC_PROJECT_ID);

const account: Account = new Account(client);
const databases: Databases = new Databases(client);
const storage: Storage = new Storage(client);

export { client, account, databases, storage };
