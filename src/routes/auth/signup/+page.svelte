<script>
	const { form } = $props();
	$inspect(form);
</script>

<div>
	<form method="POST" action="?/signup">
		<div>
			<label for="name">Name:</label>
			<input type="text" id="name" name="name" placeholder="Enter your name" required />
		</div>

		<div>
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" placeholder="Enter your email" required />
		</div>

		<div>
			<label for="password">Password:</label>
			<input
				type="password"
				id="password"
				name="password"
				placeholder="Enter your password"
				required
			/>
		</div>

		<div>
			<button type="submit">Login</button>
		</div>

		{#if form?.error}
			<p style="color: red;">{form.error}</p>
		{/if}
	</form>
</div>
