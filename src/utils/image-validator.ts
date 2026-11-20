import fs from 'fs';
import path from 'path';
import { expect } from '@playwright/test';

export function validateImage(filePath: string) {

  // Verificar que el archivo exista
  expect(fs.existsSync(filePath)).toBeTruthy();

  // Obtener extensión
  const extension = path.extname(filePath);

  const validExtensions = [
    '.jpg',
    '.jpeg',
    '.png',
    '.svg'
  ];

  // Validar extensión sin distinguir mayúsculas
  expect(
    validExtensions
  ).toContain(extension.toLowerCase());

  // Obtener tamaño del archivo
  const stats = fs.statSync(filePath);

  console.log('Extensión:', extension);
  console.log('Tamaño:', stats.size, 'bytes');

  // Validar que sea menor a 500000 bytes
  expect(stats.size).toBeLessThan(500000);

}