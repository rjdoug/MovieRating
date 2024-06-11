<script lang="ts">
	import 'carbon-components-svelte/css/white.css';
	``;
	export let data;
</script>

<svelte:head>
	<title>Movie Rater</title>
</svelte:head>

<nav>
	<ul>
		<li>
			<a href="/" class={data.path[0] == '' ? 'selected' : ''}>Home</a>
		</li>
		<!-- <li>
			<a href="/ratings" class={data.path[0] == 'ratings' ? 'selected' : ''}>Ratings</a>
		</li> -->
	</ul>
</nav>

<main>
	<slot />
</main>

<style>
	:root {
		--panel-color: #1f2635;
		--background-color: #16212e;
		--color-heading: #252a31;

		--font-size-h1: 40px;
		--font-size-text-large: 16px;
		--font-size-text-normal: 15px;
		--font-size-text-small: 13px;

		--color-primary: #00a58e;
		--color-primary-hover: #009580;
		--color-border: #374050;
		--color-text-menu: #fffefe;

		--color-button-background: #423cbf;
		--color-button-border: #6367f0;
		--color-button-background-hover: #4f47e4;

		--color-text-primary: #d1d5db;
		--color-title-primary: #818cf8;
		--color-title-secondary: #c084fc;

		--box-shadow-fixed: 0 0 2px 0 rgba(37, 42, 49, 0.16), 0 2px 4px 0 rgba(37, 42, 49, 0.12);
		--box-shadow-action: 0 0 2px 0 rgba(37, 42, 49, 0.16), 0 1px 4px 0 rgba(37, 42, 49, 0.12);
		--box-shadow-action-active: 0 1px 4px 0 rgba(37, 42, 49, 0.16),
			0 4px 8px 0 rgba(37, 42, 49, 0.12);
	}

	:global(body, html) {
		height: 100%;
		padding: 0;
		margin: 0;
		/* background-color: #fafafb; Light gray background */
		background-color: var(--background-color); /* Light gray background */
		color: var(--color-text-primary);
		font-family: 'Roboto', sans-serif; /* Material UI default font */
	}

	:global(*) {
		-webkit-tap-highlight-color: transparent; /* For WebKit browsers */
		outline: none; /* For Firefox browsers */
	}

	nav ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		background-color: var(--panel-color);
		height: 3rem;
		/* box-shadow: var(--box-shadow-fixed); */
		border-bottom: 1px solid var(--color-border);
	}

	li {
		height: 100%;
	}

	nav ul li a {
		text-decoration: none;
		color: var(--color-text-menu);
		font-size: var(--font-size-text-normal);
		display: flex;
		align-items: center;
		transition: background-color 0.3s ease;
		height: 100%;
		padding: 0 1rem;
	}

	nav ul li:hover,
	.selected:hover {
		background-color: #a0b0df;
	}

	main {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 2rem;
	}

	@media (min-width: 320px) {
		main {
			margin: 0;
		}
	}
</style>
