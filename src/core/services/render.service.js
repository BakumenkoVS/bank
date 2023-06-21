import ChildComponent from "../component/child.component"

class RenderService {
	/**
	 * @param {string} html
	 * @param {Array} components
	 * @param {Object} [styles]
	 * @returns {htmlToElement}
	 */

	htmlToElement(html, components = [], styles) {
		const template = document.createElement("template")
		template.innerHTML = html
		const element = template.content.firstChild

		if (styles) {
			this.#applyModuleStyles(styles, element)
		}

		console.log(element)
		this.#replaceComponentTags(element, components)

		return element
	}

	/**
	 * @param {Array} components
	 * @returns {htmlToElement} parentElement
	 */
	#replaceComponentTags(parentElement, components) {
		const componentTagPattern = /^component-/
		const allElements = parentElement.getElementsByTagName("*")

		for (const element of allElements) {
			const elementTagName = element.tagName.toLowerCase()
			if (componentTagPattern.test(elementTagName)) {
				const componentName = elementTagName
					.replace(componentTagPattern, "")
					.replace(/-/g, "")

				const foundComponent = components.find(Component => {
					const instance =
						Component instanceof ChildComponent ? Component : new Component()

					return instance.constructor.name.toLowerCase() === componentName
				})
				if (foundComponent) {
					const componentContent =
						foundComponent instanceof ChildComponent
							? foundComponent.render()
							: new foundComponent().render()
					element.replaceWith(componentContent)
				} else {
					console.error(
						`Component '${componentName}' not found in the provided components array`
					)
				}
			}
		}
	}

	/**
	 * @param {Object} moduleStyles
	 * @param {string} element
	 * @returns {void}
	 */
	#applyModuleStyles(moduleStyles, element) {
		if (!element) return
		const applyStyles = element => {
			for (const [key, value] of Object.entries(moduleStyles)) {
				if (element.classList.contains(key)) {
					element.classList.remove(key)
					element.classList.add(value)
				}
			}
		}

		if (element.getAttribute("class")) {
			applyStyles(element)
		}

		const elements = element.querySelectorAll("*")
		elements.forEach(applyStyles)
	}
}

export default new RenderService()
