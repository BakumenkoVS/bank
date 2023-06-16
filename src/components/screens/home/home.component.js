import { BaseScreen } from "@/core/component/base-screen.component"

import styles from "./home.module.scss"
import template from "./home.template.html"

import RenderService from "@/core/services/render.service"

export class Home extends BaseScreen {
	constructor() {
		super({ title: "Home" })
	}
	render() {
		const element = RenderService.htmlToElement(template, [], styles)
		return element.outerHTML
	}
}
