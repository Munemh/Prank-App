import * as ImageManipulator from 'expo-image-manipulator';
import { Image } from 'react-native';
import { ID } from 'appwrite';
import { databases } from './appWrite';

const DATABASE_ID = '680e0f9c00200f4c81d1';
const COLLECTION_ID = '680e12f700088066e831';
const BUCKET_ID = 'Prank-Images';

export const createPrankEvent = async (image: any, isTriggered: boolean) => {
  try {
    const manipulated = await ImageManipulator.manipulateAsync(
      Image.resolveAssetSource(image).uri,
      [],
      { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
    );

    const fileId = ID.unique();

    const formData = new FormData();
    formData.append('file', {
      uri: manipulated.uri,
      name: `prank-${fileId}.jpg`,
      type: 'image/jpeg',
    } as any);

    const response = await fetch(`${process.env.EXPO_PUBLIC_APP_WRITE_ENDPOINT}/storage/buckets/${BUCKET_ID}/files`, {
      method: 'POST',
      headers: {
        'X-Appwrite-Project': process.env.EXPO_PUBLIC_PROJECT_ID!,
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const uploadResult = await response.json();

    await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
      imageId: uploadResult.$id,
      timestamp: new Date().toISOString(),
      triggered: isTriggered,
    });

    alert('Success:::::::Prank saved successfully!');
  } catch (err) {
    alert('Error:::::::::::Failed to save prank.');
    console.error(err);
  }
};
