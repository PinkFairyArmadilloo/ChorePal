import axios from 'axios';
import type { ImageResponse } from './types';

const API_BASE_URL = 'http://localhost:3000';

export const fetchChoreImage = async (
  filename: string
): Promise<ImageResponse | null> => {
  try {
    const response = await axios.get<ImageResponse>(
      `${API_BASE_URL}/images/${filename}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching image:', error);
    return null;
  }
};
