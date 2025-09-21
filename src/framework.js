// ------------------------------------------- \\
// ---------- Written by Jacob King ---------- \\
// --- Repositories on GitHub @jacossaurus --- \\
// ------------------------------------------- \\
// ---------------- Framework ---------------- \\
// ------------------------------------------- \\

// Classes
class KingFramework {
	constructor() {
		this._VERSION = "1.2.3";

		this.Widget = Widget;
		this.Vector3 = Vector3;
		this.Color3 = Color3;
		this.Gradient = Gradient;

		this.format = format;
		this.round = round;
		this.fetch = fetch;
		this.alert = alert;
	}
}

class Base {
	constructor(className) {
		this.className = className;
	}

	isA(className) {
		return this.className === className;
	}

	log() {
		console.log(JSON.stringify(this, decycle()));
	}
}

class Object extends Base {
	constructor(className, parent, ...args) {
		super(className);

		this.parent = parent;

		this.name = className;

		if (className === "Label") {
			this.object = this.parent.object.addText(...args);
		} else if (className === "Stack") {
			if (parent) {
				this.object = parent.object.addStack();
			} else {
				this.object = new ListWidget();
			}
		} else {
			console.error(
				`Invalid class name (${className}) to be parented to ${parent.name} with args: ${args}`,
			);
		}

		if (parent) {
			this.parent.children = this.parent.children || [];
			this.parent.children.push(this);
		}
	}

	findFirstChild(name) {
		return this.children?.findChild((child) => child.name === name) || null;
	}

	set name(n) {
		if (this.parent) {
			if (this.parent[this.name]) {
				this.parent[this.name] = null;
			}

			this.parent[n] = this;
		}
	}

	set(property, value) {
		this.object[property] = value;
	}

	addClass(c) {
		const properties = this.parent?.classes?.[c] || widget.classes[c];

		if (properties) {
			for (const key in properties) {
				this[key] = properties[key];
			}
		}
	}
}

class Label extends Object {
	constructor(parent, ...args) {
		super("Label", parent, ...args);

		this.color = Color3.white();
	}

	get text() {
		return this.object.text;
	}

	set text(s) {
		this.object.text = s;
	}

	set font(font) {
		this.object.font = font;
	}

	set color(color3) {
		this.object.textColor = color3.toColor();
	}
}

class Stack extends Object {
	constructor(name, parent) {
		super("Stack", parent || widget);

		this.name = name;
		this.classes = [];
	}

	addLabel(name, text) {
		const label = new Label(this, text);
		label.name = name;

		return label;
	}

	addSpacer(length) {
		return this.object.addSpacer(length);
	}

	addStack(name) {
		return new Stack(name, this);
	}

	addClass(className, properties) {
		this.classes[className] = properties;
	}

	vertical() {
		this.object.layoutVertically();
	}

	horizontal() {
		this.object.layoutHorizontally();
	}

	set size(s) {
		this.object.size = s;
	}

	set backgroundColor(color3) {
		this.object.backgroundColor = color3.toColor();
	}

	set backgroundGradient(gradient) {
		this.object.backgroundGradient = gradient.toLinearGradient();
	}
}

class Widget extends Stack {
	constructor(theme) {
		super("Widget");

		widget = this;

		if (theme) {
			if (theme.isA("Color3")) {
				this.backgroundColor = theme || Color3.new();
			} else if (theme.isA("Gradient")) {
				this.backgroundGradient = theme;
			}
		} else {
			this.theme = "Transparent";
		}

		this.object.useDefaultPadding();
	}

	async show(size, disableFooter) {
		if (!size) {
			console.error("No size was provided when calling Widget.show");
		}

		if (!disableFooter) {
			this.addFooter();
		}

		if (config.runsInWidget) {
			if (this.theme === "Transparent") {
				await this.createTransparentBackground(true, size);
			}

			Script.setWidget(this.object);
		} else {
			if (this.theme === "Transparent") {
				await this.createTransparentBackground(false, size);
			}

			this.object[`present${size}`]();
		}
	}

	addFooter(text) {
		this.addSpacer();

		const footer = this.addLabel(
			"Footer",
			text ?? `Made by The King - v${King._VERSION}`,
		);

		footer.font = Font.lightSystemFont(12);
		footer.object.centerAlignText();

		return footer;
	}

	async createTransparentBackground(isReal, widgetSize) {
		const fileName = `${Script.name()}.jpg`;
		const files = FileManager.local();
		const path = files.joinPath(files.documentsDirectory(), fileName);

		if (isReal) {
			this.object.backgroundImage = files.readImage(path);
		} else {
			let message;

			message =
				"A transparent background is desired. First, go to your home screen and enter wiggle mode. Scroll to the empty page on the farthest to the right and take a screenshot.";

			const isExiting = await alert(message, [
				"Continue",
				"Exit to Take Screenshot",
			]);

			if (isExiting) return;

			const image = await Photos.fromLibrary();
			const height = image.size.height;

			const phones = importModule("phones");
			let phone = phones[height];

			if (!phone) {
				await alert(
					"The photo selected has been edited or is not a valid iPhone screenshot. Try again with a valid screenshot.",
					["Okay"],
				);

				return;
			}

			if (height === 2436) {
				const cacheName = "mz-phone-type";
				const cachePath = files.joinPath(files.libraryDirectory(), cacheName);

				if (files.fileExists(cachePath)) {
					const typeString = files.readString(cachePath);

					phone = phone[typeString];
				} else {
					message = "What type of iPhone do you have?";

					const types = ["iPhone 12 Mini", "iPhone 11 Pro, XS, or X"];
					const typeIndex = await alert(message, types);
					const type = typeIndex === 0 ? "mini" : "x";

					phone = phone[type];

					files.writeString(cachePath, type);
				}
			}
		}
	}
}

class Color3 extends Base {
	constructor(r, g, b) {
		super("Color3");

		this.r = Math.max(0, Math.min(255, r ?? 0));
		this.g = Math.max(0, Math.min(255, g ?? 0));
		this.b = Math.max(0, Math.min(255, b ?? 0));
	}

	hex() {
		return (
			"#" +
			((1 << 24) + (this.r << 16) + (this.g << 8) + this.b)
				.toString(16)
				.slice(1)
		);
	}

	toColor() {
		return new Color(this.hex());
	}

	static fromColor(color) {
		return new Color3(color.red * 255, color.green * 255, color.blue * 255);
	}

	static white() {
		return new Color3(255, 255, 255);
	}

	static black() {
		return new Color3();
	}

	static add(c1, c2) {
		return new Color3(c1.r + c2.r, c1.g + c2.g, c1.b + c2.b);
	}

	static sub(c1, c2) {
		return new Color3(c1.r - c2.r, c1.g - c2.g, c1.b - c2.b);
	}

	static mul(c1, c2) {
		return new Color3(c1.r * c2.r, c1.g * c2.g, c1.b * c2.b);
	}

	static div(c1, c2) {
		return new Color3(c1.r / c2.r, c1.g / c2.g, c1.b / c2.b);
	}
}

class Gradient extends Base {
	constructor(colors, locations) {
		super("Gradient");

		this.object = new LinearGradient();

		if (colors && locations) {
			this.object.colors = colors;
			this.object.locations = locations;
		}
	}

	static fromBaseColor3(color3) {
		const bottom = color3;
		const top = Color3.add(color3, new Color3(25, 25, 25));

		return new Gradient([top.toColor(), bottom.toColor()], [0, 1]);
	}

	toLinearGradient() {
		return this.object;
	}
}

class Vector3 extends Base {
	constructor(x = 0, y = 0, z = 0) {
		super("Vector3");

		this.x = x;
		this.y = y;
		this.z = z;
	}

	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
	}

	add(v) {
		return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
	}

	sub(v) {
		return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
	}

	mul(v) {
		return new Vector3(this.x * v.x, this.y * v.y, this.z * v.z);
	}

	div(v) {
		return new Vector3(this.x / v.x, this.y / v.y, this.z / v.z);
	}
}

function round(num, places) {
	const multiplier = 10 ** places;

	return Math.round(num * multiplier) / multiplier;
}

function format(n) {
	return n.toLocaleString("en-US");
}

async function alert(message, options) {
	console.log(message, options);
	const alert = new Alert();
	alert.message = message;

	for (const option of options) {
		alert.addAction(option);
	}

	const response = await alert.presentAlert();

	return response;
}

async function fetch(url, params) {
	params = params || {};

	const request = new Request(url);
	request.allowInsecureRequest = true;
	request.method = params.method || "GET";
	request.headers = params.headers;
	request.body = params.body;

	if (params.loadJSON || params.loadJSON === undefined) {
		return await request.loadJSON();
	} else {
		return await request.load();
	}
}

const King = new KingFramework();
let widget;

// Export
function wrap() {
	module.exports = King;
}

function decycle() {
	const seen = new WeakSet();

	return (_, value) => {
		if (typeof value === "object" && value !== null) {
			if (seen.has(value)) {
				return "cyclic_object_detected";
			}

			seen.add(value);
		}

		return value;
	};
}

wrap();

Script.complete();
