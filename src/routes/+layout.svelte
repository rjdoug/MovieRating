<script lang="ts">
	export let data;
</script>

<nav>
	<ul>
		<li>
			<a href="/" class={data.path[0] == '' ? 'selected' : ''}>Home</a>
		</li>
		<li>
			<a href="/ratings" class={data.path[0] == 'ratings' ? 'selected' : ''}>Ratings</a>
		</li>
	</ul>
</nav>

<slot />

<style>
	/* #FAFAFB - Snow
	#EFB7BA - spanish pink
	#e5c0c8 - dust storm
	#cbd5f0 - soap
	#194F92 - yale blue */

	:global(body, html) {
		height: 100%;
		padding: 0;
		margin: 0;
		background-color: #fafafb; /* Light gray background */
		font-family: 'Roboto', sans-serif; /* Material UI default font */
	}

	.selected {
		background-color: #a0b0df;
	}

	nav ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		background-color: #cbd5f0;
		height: 3rem;
	}

	li {
		height: 100%;
	}

	nav ul li a {
		text-decoration: none;
		color: #194f92;
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
</style>
