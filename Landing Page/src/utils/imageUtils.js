/**
 * Image compression utility for Trident.
 * Resizes and compresses images before upload to keep payload sizes small.
 * Same approach as Amrapali project.
 */

const MAX_WIDTH = 1200;
const MAX_HEIGHT = 1200;
const QUALITY = 0.7;

/**
 * Compress an image file using canvas.
 * Returns a compressed base64 data URL (JPEG).
 */
export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    if (file.type.startsWith('video/')) {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;

        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          const ratio = Math.min(MAX_WIDTH / width, MAX_HEIGHT / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', QUALITY);
        console.log(`[IMAGE] ${file.name}: ${(file.size / 1024).toFixed(0)}KB → ${(compressedDataUrl.length * 0.75 / 1024).toFixed(0)}KB`);
        resolve(compressedDataUrl);
      };
      img.onerror = () => resolve(reader.result);
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
