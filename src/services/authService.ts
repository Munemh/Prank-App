import { account, databases } from './appWrite';
import { ID, Models } from 'appwrite';



export async function signUp(email: string, password: string, name: string): Promise<Models.User<Models.Preferences>> {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name,
    );
    console.log('Account created:', user);

    await databases.createDocument(
      process.env.EXPO_PUBLIC_DATABASE_ID,
      process.env.EXPO_PUBLIC_COLLECTION_ID,
      ID.unique(),
      {
        userId: user.$id,
        email: user.email,
        name: user.name,
        password: password,
      }
    );
    console.log('User saved to database.');
    return user;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function login(email: string, password: string): Promise<Models.Session> {
  try {
    const session = await account.createEmailPasswordSession(
      email,
      password
    );
    console.log('Login successful:', session);
    return session;
  } catch (error) {
    // await logout(); // Always good to await properly
    console.error('Login error:', error);
    throw error;
  }
}

export async function logout(): Promise<boolean> {
  try {
    await account.deleteSession('current');
    console.log('Logout successful.');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
