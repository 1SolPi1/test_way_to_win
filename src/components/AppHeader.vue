<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();

const menuItems = computed(() => {
  return [
    { title: "Доктора", path: "/doctors", isActive: route.path === "/doctors" },
    { title: "Медсестры", path: "/nurses", isActive: route.path === "/nurses" },
  ];
});
</script>
<template>
  <v-toolbar
    dark
    prominent
  >
    <div class="mx-auto d-flex h-100 ga-12">
      <v-btn
        v-for="item in menuItems"
        :key="item.path"
        :value="item.path"
        class="h-100"
        :to="item.path"
        :active="item.isActive"
      >
        <span>{{ item.title }}</span>
      </v-btn>
    </div>
  </v-toolbar>
</template>
