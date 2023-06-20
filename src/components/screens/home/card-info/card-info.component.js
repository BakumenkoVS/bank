
import styles from "./card-info.module.scss"
import template from "./card-info.template.html"

import RenderService from "@/core/services/render.service"
import ChildComponent from '@/core/component/child.component';

export class CardInfo extends ChildComponent {
	
	render() {
		this.element = RenderService.htmlToElement(template, [], styles)
		return this.element
	}
}