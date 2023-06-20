
import styles from "./header.module.scss"
import template from "./header.template.html"

import RenderService from "@/core/services/render.service"
import ChildComponent from '@/core/component/child.component';

export class Header extends ChildComponent {
	
	render() {
		this.element = RenderService.htmlToElement(template, [], styles)
		return this.element
	}
}