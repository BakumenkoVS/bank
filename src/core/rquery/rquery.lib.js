import { formatCardNumberWithDashes } from "@/utils/format/format-card-number"

class RQuery {
	/**
	 *
	 * @param {string|HTMLElement} selector
	 */
	constructor(selector) {
		if (typeof selector === "string") {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} not found!`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error("Invalid selector type")
		}
	}

	/**
	 *
	 * @param {string} selector
	 * @returns {RQuery}
	 */
	find(selector) {
		const element = new RQuery(this.element.querySelector(selector))
		if (element) {
			return element
		} else {
			throw new Error(`Element ${selector} not found!`)
		}
	}

	/**
	 *
	 * @param {HTMLElement} childElement
	 * @returns {RQuery}
	 */
	append(childElement) {
		this.element.appendChild(childElement)
		return this
	}

	/**
	 *
	 * @param {HTMLElement} newElement
	 * @returns {RQuery}
	 */
	before(newElement) {
		if (!(newElement instanceof HTMLElement)) {
			throw new Error("Element must be an HTMLElement")
		}

		const parentElement = this.element.parentElement

		if (parentElement) {
			parentElement.insertBefore(newElement, this.element)
			return this
		} else {
			throw new Error("Element does not have a parent element")
		}
	}

	/**
	 *
	 * @param {string} [htmlContent]
	 * @returns {RQuery|string}
	 */
	html(htmlContent) {
		if (typeof htmlContent === "undefined") {
			return this.element.innerHTML
		} else {
			this.element.innerHTML = htmlContent
			return this
		}
	}

	/**
	 *
	 * @param {function(Event): void } callback
	 * @returns {RQuery}
	 */
	click(callback) {
		this.element.addEventListener("click", callback)
		return this
	}

	/**
	 *
	 * @param {object} options
	 * @param {function(Event): void} [options.onInput]
	 * @param {object} [options.rest]
	 * @returns {RQuery}
	 */

	input({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== "input")
			throw new Error("Element must be an input")
		for (const [key, value] of Object.entries(rest)) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener("input", onInput)
		}

		return this
	}

	/**
	 *
	 * @param {number} [limit]
	 * @returns {RQuery}
	 */
	numberInput(limit) {
		if (
			this.element.tagName.toLocaleLowerCase() !== "input" ||
			this.element.type !== "number"
		)
			throw new Error("Element must be an input with type number")

		this.element.addEventListener("input", event => {
			let value = event.target.value.replace(/[^0-9]/g, "")
			if (limit) value = value.substring(0, limit)
			event.target.value = value
		})
		return this
	}

	/**
	 *
	 * @returns {RQuery}
	 */
	creditCardInput() {
		const limit = 16
		if (
			this.element.tagName.toLocaleLowerCase() !== "input" ||
			this.element.type !== "text"
		)
			throw new Error("Element must be an input with type text")

		this.element.addEventListener("input", event => {
			let value = event.target.value.replace(/[^0-9]/g, "")
			if (limit) value = value.substring(0, limit)
			event.target.value = formatCardNumberWithDashes(value)
		})
		return this
	}

	/**
	 *
	 * @param {string} property
	 * @param {string} value
	 * @returns {RQuery}
	 */
	css(property, value) {
		if (typeof property != "string" || typeof value != "string") {
			throw new Error("property and value must be strings")
		}

		this.element.style[property] = value
		return this
	}

	/**
	 *
	 * @param {string| string[]} classNames
	 * @returns {RQuery}
	 */
	addClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}
		return this
	}

	/**
	 *
	 * @param {string| string[]} classNames
	 * @returns {RQuery}
	 */
	removeClass(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.remove(className)
			}
		} else {
			this.element.classList.remove(classNames)
		}
		return this
	}
}

export function $R(selector) {
	return new RQuery(selector)
}
