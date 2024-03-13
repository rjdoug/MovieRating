<script>
import { handleError } from 'sveltekit';

// ... Other layout logic

export let error; // Declare a variable to store the error

handleError = (error) => {
  // Log the error to a service
  console.error('Uncaught Error:', error);

  // Determine error type (expected vs. unexpected)
  const isExpectedError = error instanceof MyCustomError || // Check for custom error classes
                          error.message?.startsWith('404'); // Check for specific error messages

  // Handle expected errors (e.g., display custom error page)
  if (isExpectedError) {
    throw new Error('500'); // Or return a custom error object
  }

  // Handle unexpected errors (generic message, no sensitive info)
  error = {
    message: 'An unexpected error occurred. Please try again later.',
    code: 'ERR_123' // Optional basic error code for reference
  };
};
</script>

<svelte:head>
  <title>Your App Name</title>
</svelte:head>

<div class="layout">
  <header>
    </header>

  <main>
    <slot />
  </main>

  <footer>
    </footer>
</div>

{#if error}
  <div class="error-message">
    <p>{error.message}</p>
    <p>Error code: {error.code}</p>
  </div>
{/if}


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

<main>
	<slot />
</main>

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

	main {
		display: flex;
		align-items: center;
		flex-direction: column;
		margin: 2rem;
		height: 100%;
	}
</style>
