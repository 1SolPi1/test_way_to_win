// Utilities
import { persons } from "@/moks/persons";
import type { Person } from "@/types/perosn.interface";
import { defineStore } from "pinia";

export const usePersonsStore = defineStore("persons", () => {
  const personsList = ref<Person[]>(persons);

  const addPerson = (person: Person) => {
    personsList.value.push(person);

    if (person.isHead) {
      personsList.value = personsList.value.map((p) => ({
        ...p,
        isHead: p.id === person.id,
      }));
    }
  };

  const removePerson = (person: Person) => {
    personsList.value = personsList.value.filter((p) => p.id !== person.id);
  };

  const updatePerson = (person: Person) => {
    personsList.value = personsList.value.map((p) =>
      p.id === person.id ? person : p
    );

    if (person.isHead) {
      personsList.value = personsList.value.map((p) => ({
        ...p,
        isHead: p.id === person.id,
      }));
    }
  };

  return { personsList, addPerson, removePerson, updatePerson };
});
