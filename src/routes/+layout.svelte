<script lang="ts">
	export let data;

	console.log(data.path);
</script>

<nav>
	<ul>
		<li>
			<a href="/" class={data.path[0] == '' ? 'selected' : ''}>Home</a>
		</li>
		<li>
			<a href="/new-rating" class={data.path[0] == 'new-rating' ? 'selected' : ''}>New Rating</a>
		</li>
	</ul>
</nav>

<slot />

<style>
	:global(body, html) {
		height: 100%;
		padding: 0;
		margin: 0;
		background-color: #f7f7f7; /* Light gray background */
		font-family: 'Roboto', sans-serif; /* Material UI default font */
	}

	.selected {
		background-color: #5cb55c;
	}

	nav ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: center;
		background-color: #0275dd;

		height: 3rem;
	}

	li {
		height: 100%;
	}

	nav ul li a {
		text-decoration: none;
		color: white;
		display: flex;
		align-items: center;
		transition: background-color 0.3s ease;
		height: 100%;
		padding: 0 1rem;
	}

	nav ul li:hover,
	.selected:hover {
		background-color: #9400e7;
	}
</style>
