<script setup lang="ts">
import type { Person } from "@/types/perosn.interface";
import { usePersonsStore } from "@/stores/persons";

const personsStore = usePersonsStore();

const props = defineProps<{
  person: Person;
}>();

const handleDelete = () => {
    personsStore.removePerson(props.person);
};
</script>

<template>
  <v-dialog max-width="500">
    <template #activator="{ props: activatorProps }">
      <slot
        name="activator"
        :activator-props="activatorProps"
      />
    </template>

    <template #default="{ isActive }">
      <v-card title="Удалить сотрудника">
        <v-card-text>
          Вы действительно хотите удалить сотрудника {{ person.fio }}?
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="error"
            text="Удалить"
            @click="
              () => {
                handleDelete();
                isActive.value = false;
              }
            "
          />
          <v-spacer />

          <v-btn
            text="Отмена"
            @click="isActive.value = false"
          />
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
