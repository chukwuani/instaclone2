const NotificationBar = ({ activeLink }: { activeLink: string }) => {
	return (
		<section
			className={
				activeLink === "notification"
					? "showing-notification-sidebar notification-sidebar"
					: "notification-sidebar"
			}>
			<h1 className="w-full text-2xl font-bold text-left text-primary-text pt-4 pr-6 pb-6 pl-6 leading-[30px]">
				Notifications
			</h1>
			<article className="flex-auto flex flex-col items-center justify-center gap-4 py-5 px-10 text-center">
				<span className="notification-bg" />
				<p className="text-secondary-text text-sm">Activity On Your Posts</p>
				<p className="text-secondary-text text-sm">
					When someone likes or comments on one of your posts, you&apos;ll see it here.
				</p>
			</article>
		</section>
	);
};

export default NotificationBar;
