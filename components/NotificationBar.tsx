const NotificationBar = ({ activeLink }: { activeLink: string }) => {
	return (
		<section
			className={
				activeLink === "notification"
					? "showing-notification-sidebar notification-sidebar"
					: "notification-sidebar"
			}>
			<h1 className="w-full text-2xl font-bold text-left primary-text pt-4 pr-6 pb-6 pl-6 leading-[30px]">
				Notifications
			</h1>
			<article className="notification-activity">
				<span className="notification-bg" />
				<p className="secondary-text text-sm">Activity On Your Posts</p>
				<p className="secondary-text text-sm">
					When someone likes or comments on one of your posts, you&apos;ll see it here.
				</p>
			</article>
		</section>
	);
};

export default NotificationBar;
