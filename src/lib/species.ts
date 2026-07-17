import data from "@/data/species.json";
import type { Species } from "@/types/species";

const allSpecies = data as unknown as Species[];

export function getAllSpecies(): Species[] {
  return allSpecies;
}
