import { account, databases } from './appWrite';
import { ID } from 'appwrite';

const DATABASE_ID = '680e0f9c00200f4c81d1'; 
const COLLECTION_ID = '680e0fb200148512b736';

export async function signUp(email: string, password: string, name: string): Promise<void> {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name,
    );
    console.log('Account created:', user);

    const session = await account.createEmailPasswordSession(
      email,
      password
    );
    console.log('Session created:', session);

    await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        email: user.email,
        name: user.name,
      }
    );
    console.log('User saved to database.');
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<void> {
  try {
    const session = await account.createEmailPasswordSession(
      email,
      password
    );
    console.log('Login successful:', session);
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout(): Promise<void> {
  try {
    await account.deleteSession('current');
    console.log('Logout successful.');
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
