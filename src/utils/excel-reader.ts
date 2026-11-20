import * as XLSX from 'xlsx';
import path from 'path';
import { PokemonData } from '../types/pokemon.types';

export function readPokemonExcel(): PokemonData[] {

  const filePath = path.resolve(
    process.cwd(),
    'data',
    'Datos-pruebas.xlsx'
  );

  const workbook = XLSX.readFile(filePath);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];

  const data: PokemonData[] = XLSX.utils.sheet_to_json(sheet);

  return data.filter(
    pokemon => pokemon.ID && pokemon.Name?.trim()
  );
}