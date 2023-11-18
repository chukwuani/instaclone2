import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

const Home = () => {
	return <AuthenticateWithRedirectCallback />;
};

export default Home;
