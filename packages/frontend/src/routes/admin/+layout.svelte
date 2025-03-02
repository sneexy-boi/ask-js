<div class="btnCtn">
	<a class="btn" href="/admin">
		Dashboard
	</a>
	<a class="btn" href="/admin/settings">
		Settings
	</a>
	<a class="btn" href="/admin/invites">
		Invites
	</a>
	<a class="btn" href="/admin/users">
		Users
	</a>
</div>

<div class="adminCtn">
	<slot></slot>
</div>

<style lang="scss" scoped>
	.adminCtn {
		margin-top: 10px;
	}
</style>
