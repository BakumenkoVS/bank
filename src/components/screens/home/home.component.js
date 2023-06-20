import { BaseScreen } from "@/core/component/base-screen.component"

import styles from "./home.module.scss"
import template from "./home.template.html"

import RenderService from "@/core/services/render.service"
import { $R } from "@/core/rquery/rquery.lib"

export class Home extends BaseScreen {
	constructor() {
		super({ title: "Home" })
	}
	render() {
		const element = RenderService.htmlToElement(template, [], styles)

		$R(element).find('h1').css('color', 'green')

		return element
	}
}
