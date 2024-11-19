<script lang="ts" setup>
import type { PostType } from "@/types/post.enum";
import { usePersonsStore } from "@/stores/persons";
import { storeToRefs } from "pinia";

const personsStore = usePersonsStore();
const { personsList } = storeToRefs(personsStore);

const createModal = ref<boolean>(false);
const props = defineProps<{
  type: PostType;
}>();

const filteredPersons = computed(() =>
  personsList.value.filter((person) => person.post === props.type)
);
</script>
<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">
          ФИО
        </th>
        <th class="text-left">
          Отделение
        </th>
        <th class="text-center">
          Действия
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in filteredPersons"
        :key="item.id"
      >
        <td>{{ item.fio }} {{ item.isHead ? "(Зав. отделением)" : "" }}</td>
        <td>{{ item.department }}</td>
        <td class="d-flex justify-center align-center">
          <EditPerson
            :person="item"
            :type="props.type"
          />

          <DeletePerson :person="item">
            <template #activator="{ activatorProps }">
              <v-btn
                variant="text"
                icon="mdi-trash-can-outline"
                color="error"
                v-bind="activatorProps"
              />
            </template>
          </DeletePerson>
        </td>
      </tr>
    </tbody>
    <template #top>
      <CreateUpdateModal
        v-model="createModal"
        :type="props.type"
        class="mb-4 align-self-end"
      >
        <template #activator="{ activatorProps }">
          <v-btn
            color="primary"
            prepend-icon="mdi-plus"
            v-bind="activatorProps"
          >
            Добавить
          </v-btn>
        </template>
      </CreateUpdateModal>
    </template>
  </v-table>
</template>
