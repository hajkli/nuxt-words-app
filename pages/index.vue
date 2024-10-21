<template>
	<div class="container flex justify-center items-center">
		<Login />
	</div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const Login = defineAsyncComponent(
	() => import("@/components/forms/Login.vue")
);
</script>

<style scoped></style>
