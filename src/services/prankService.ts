import { account, databases } from './appWrite';
import { ID } from 'appwrite';

const DATABASE_ID = '680e0f9c00200f4c81d1'; 
const COLLECTION_ID = '680e12f700088066e831';
export const createPrankEvent = async (isTriggered: boolean) => {
  try {
    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      ID.unique(), 
      {
        prankTriggered: isTriggered,
        timestamp: new Date().toISOString(),
      }
    );
    console.log('Prank Event Saved:', response);
  } catch (error) {
    console.error('Error saving prank event:', error);
    throw new Error('Failed to save prank event');
  }
};