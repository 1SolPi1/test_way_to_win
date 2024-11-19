<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { PostType } from "@/types/post.enum";
import { Department } from "@/types/department.enum";
import { usePersonsStore } from "@/stores/persons";
import type { Person } from "@/types/perosn.interface";
import { uuidv4 } from "@/utils/generateRandomUID";

const personsStore = usePersonsStore();

const props = defineProps<{
  modelValue: boolean;
  type: PostType;
  person?: Person;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();

const form = ref<{
  department: Department | null;
  fio: string | null;
  isHead: boolean;
}>({
  department: null,
  fio: null,
  isHead: false,
});

const fioError = ref<string | null>(null);
const departmentError = ref<string | null>(null);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const title = computed(() => {
  switch (props.type) {
    case PostType.DOCTOR:
      return props.person ? "Обновить доктора" : "Добавить доктора";
    case PostType.NURSE:
      return props.person ? "Обновить медсестру" : "Добавить медсестру";
    default:
      return props.person ? "Обновить сотрудника" : "Добавить сотрудника";
  }
});

const actionText = computed(() => {
  return props.person ? "Обновить" : "Создать";
});

const departments: Array<string> = Object.values(Department);

const validateFio = () => {
  if (!form.value.fio) {
    fioError.value = "ФИО обязателен";
    return false;
  }
  if (form.value.fio.split(" ").length !== 3) {
    fioError.value = "ФИО должно содержать имя, фамилию и отчество";
    return false;
  }
  return true;
};

const validateDepartment = () => {
  if (!form.value.department) {
    departmentError.value = "Отделение обязательно";
    return false;
  }
  return true;
};

const validate = () => {
  return validateFio() && validateDepartment();
};

const handleAction = () => {
  if (!validate()) return;

  if (props.person) {
    personsStore.updatePerson({
      id: props.person.id,
      fio: form.value.fio!,
      department: form.value.department!,
      post: props.type,
      isHead: form.value.isHead,
    });
  } else {
    personsStore.addPerson({
      id: uuidv4(),
      fio: form.value.fio!,
      department: form.value.department!,
      post: props.type,
      isHead: form.value.isHead,
    });
  }

  dialog.value = false;

  form.value.fio = null;
  form.value.department = null;
  form.value.isHead = false;
};

watch(
  () => props.modelValue,
  () => {
    if (props.person) {
      form.value = {
        department: props.person.department,
        fio: props.person.fio,
        isHead: props.person.isHead ?? false,
      };
    }
  }
);
</script>
<template>
  <div class="pa-4 text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">
        <slot
          name="activator"
          :activator-props="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-account"
        :title="title"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                v-model.trim="form.fio"
                label="ФИО*"
                required
                :error-messages="fioError"
                @input="fioError = ''"
              />
            </v-col>

            <v-col cols="12">
              <v-autocomplete
                v-model="form.department"
                :items="departments"
                label="Отделение*"
                :error-messages="departmentError"
                @input="departmentError = ''"
              />
              <v-checkbox
                v-if="props.type === PostType.DOCTOR"
                v-model="form.isHead"
                label="Зав. отделением"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="dialog = false"
          />

          <v-btn
            color="primary"
            :text="actionText"
            variant="tonal"
            @click="handleAction"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
