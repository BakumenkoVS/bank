const SITE_NAME = "Bank vanilla js"
export const getTitle = title => {
	return title ? `${title}|${SITE_NAME}` : SITE_NAME
}
