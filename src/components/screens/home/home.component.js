import { BaseScreen } from "@/core/component/base-screen.component"

import styles from "./home.module.scss"
import template from "./home.template.html"

import { Button } from "../../ui/button/button.component"
import { Field } from "../../ui/field/field.component"

import { $R } from "@/core/rquery/rquery.lib"
import RenderService from "@/core/services/render.service"

export class Home extends BaseScreen {
	constructor() {
		super({ title: "Home" })
	}
	render() {
		console.log(Button)

		const element = RenderService.htmlToElement(
			template,
			[
				new Field({
					name: "awdawd",
					placeholder: "Enter email",
					variant: "green"
				})
			],
			styles
		)
		$R(element).find("h1").css("color", "green")

		return element
	}
}
