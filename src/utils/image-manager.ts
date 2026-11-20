import fs from 'fs';
import path from 'path';

export function saveImage(
  pokemonName: string,
  imageBuffer: Buffer,
  extension: string
): string {

  const imageDirectory = path.resolve(
    process.cwd(),
    'images'
  );

  // Crear carpeta si no existe
  fs.mkdirSync(imageDirectory, { recursive: true });

  // Nombre del archivo
  const fileName = `${pokemonName.toLowerCase()}${extension}`;

  const filePath = path.join(imageDirectory, fileName);

  // Sobrescribir si ya existe
  fs.writeFileSync(filePath, imageBuffer);

  console.log('Imagen guardada:', filePath);

  return filePath;
}