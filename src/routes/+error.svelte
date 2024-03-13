<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>Error {$page.status}</title>
</svelte:head>

<body>
	<h1>Oops! An error occurred.</h1>
	<p>Error code: {$page.status}</p>
	<p>Error message: {$page.error?.message}</p>

	<p>Here are some things you can try:</p>
	<ul>
		<li>Refresh the page.</li>
		<li>Check your internet connection.</li>
		<li>Try again later.</li>
	</ul>
</body>
