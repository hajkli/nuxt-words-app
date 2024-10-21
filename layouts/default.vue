<template>
	<div class="flex flex-col min-h-screen">
		<header class="bg-gray-800 text-white p-4">
			<h1 class="text-lg font-bold">FE assignment</h1>
		</header>
		<main class="bg-slate-300 flex-grow flex justify-center">
			<ConfirmationModal />
			<NuxtPage />
		</main>
		<footer class="bg-gray-800 text-white p-4">
			<p class="text-center">
				<a
					href="https://www.linkedin.com/in/romanbalogh/?originalSubdomain=sk"
					target="_blank"
					>Balogh Roman</a
				>
				| +421 908 866 325 | hajkli@gmail.com | balogh@vivaldi.net
			</p>
		</footer>
	</div>
</template>

<script setup lang="ts">
import ConfirmationModal from "@/components/ui/ConfirmationModal.vue";
</script>

<style scoped></style>
