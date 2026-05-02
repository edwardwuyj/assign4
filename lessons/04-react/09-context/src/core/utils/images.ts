import { IMAGE_BASE_URL, IMAGE_PLACEHOLDER, ORIGINAL_IMAGE_BASE_URL } from '@/core';

export const getBackdropUrl = (fileName: string) => (fileName ? `${ORIGINAL_IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER);

export const getImageUrl = (fileName: string) => (fileName ? `${IMAGE_BASE_URL}${fileName}` : IMAGE_PLACEHOLDER);
