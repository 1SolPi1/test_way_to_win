<script setup lang="ts">
import type { Person } from '@/types/perosn.interface';
import type { PostType } from '@/types/post.enum';
const updateModal = ref(false);
defineProps<{
  person: Person;
  type: PostType;
}>();
</script>

<template>
  <CreateUpdateModal
    v-model="updateModal"
    :type="type"
    :person="person"
  >
    <template #activator="{ activatorProps }">
      <v-btn
        variant="text"
        icon="mdi-pencil"
        color="primary"
        v-bind="activatorProps"
      />
    </template>
  </CreateUpdateModal>
</template>
