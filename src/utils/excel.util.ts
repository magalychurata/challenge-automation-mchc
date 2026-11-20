import * as XLSX from 'xlsx';
import path from 'node:path';

export interface PokemonExcelRow {
  id: number;
  name: string;
}

export function readPokemonExcel(): PokemonExcelRow[] {

  // Ubicación del Excel original
  const filePath = path.resolve(
    process.cwd(),
    'data',
    'Datos-pruebas.xlsx'
  );

  // Leer directamente el archivo XLSX
  const workbook = XLSX.readFile(filePath);

  // Obtener la primera hoja
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    throw new Error('No se encontró una hoja en el Excel');
  }

  // Leer filas directamente desde XLSX
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(
    worksheet,
    { defval: '' }
  );

  if (rows.length === 0) {
    throw new Error('El Excel no contiene datos');
  }

  const headers = Object.keys(rows[0]);
  const idHeader = headers.find((header) => header.trim().toLowerCase() === 'id');
  const nameHeader = headers.find((header) => header.trim().toLowerCase() === 'name');

  if (!idHeader || !nameHeader) {
    throw new Error('El Excel debe contener las columnas "ID" y "Name"');
  }

  return rows.map((row, index) => {
    const rawId = String(row[idHeader] ?? '').trim();
    const id = Number(rawId);
    const name = String(row[nameHeader] ?? '').trim().toLowerCase();

    if (!rawId || !Number.isInteger(id) || id <= 0) {
      throw new Error(`ID inválido en la fila ${index + 2}`);
    }

    if (!name) {
      throw new Error(`Name vacío en la fila ${index + 2}`);
    }

    return { id, name };
  });
}