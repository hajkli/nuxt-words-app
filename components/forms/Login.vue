<template>
	<div class="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
		<h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
		<form @submit.prevent="handleLogin">
			<FormField label="Username:" id="username" v-model="username" />
			<ValidationMessage v-if="errorMessage" :message="errorMessage" />
			<FormField label="Password:" id="password" type="password" disabled />

			<BaseButton
				id="login"
				type="submit"
				variant="primary"
				class="w-full mt-4"
			>
				Login
			</BaseButton>
		</form>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import FormField from "@/components/ui/FormField.vue";
import BaseButton from "../ui/BaseButton.vue";
import ValidationMessage from "./ValidationMessage.vue";

const sanitizeInput = (input: string): string => {
	return input.replace(/[<>/$]/g, "");
};

const username = ref<string>("");
const errorMessage = ref<string>("");
const router = useRouter();
const store = useStore();

const handleLogin = () => {
	const sanitizedUsername = sanitizeInput(username.value);

	if (sanitizedUsername.length < 3) {
		errorMessage.value =
			"Username must be at least 3 characters long. You can put anything here. It is just a demo.";
		return;
	}

	errorMessage.value = "";
	store.dispatch("user/login", sanitizedUsername);
	router.push("/words");
};
</script>

<style scoped></style>
