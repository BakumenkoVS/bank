import { AboutUs } from "@/components/screens/about-us/about-us.component"
import { Home } from "@/components/screens/home/home.component"

export const ROUTES = [
	{
		path: "/",
		component: Home
	},
	{
		path: "/auth",
		component: Auth
	},
	{
		path: "/about-us",
		component: AboutUs
	}
]
