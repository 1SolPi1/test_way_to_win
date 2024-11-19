<script lang="ts" setup>
import { PostType } from "@/types/post.enum";
</script>

<template>
  <PersonTable :type="PostType.DOCTOR" />
</template>
