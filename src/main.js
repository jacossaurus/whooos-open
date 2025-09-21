const King = importModule("framework");

const Widget = King.Widget;
const Vector3 = King.Vector3;
const Color3 = King.Color3;
const Gradient = King.Gradient;

const fetch = King.fetch;

const DEFAULT_LOCATIONS = importModule("locations");

const FONT_SIZE = 12;
const USE_LOCATION = args.widgetParameter ?? false;
const KM_TO_MI = 0.621371;

async function init() {
	const widget = new Widget(Gradient.fromBaseColor3(new Color3(0, 32, 91)));
	const body = widget.addStack("Body");
	body.object.url = "https://dining.rice.edu/";
	body.vertical();

	const title = body.addLabel("TitleLabel", "Whooo's Open? 🦉");
	title.object.centerAlignText();
	title.font = Font.boldSystemFont(16);

	let { locations, version } = DEFAULT_LOCATIONS.data;

	try {
		const { data } = await fetch(
			"https://mrking.dev/whooos-open/data.json",
		).catch((err) => console.warn(`Failed to get servery hours. ${err}`));

		if (data.locations && data.version) {
			locations = data.locations;
			version = data.version;
		} else {
			console.warn("Malformed data from server.", data);
		}
	} catch (err) {
		console.warn(`Failed to get servery hours. ${err}`);
	}

	const red = new Color3(200, 50, 50);
	const green = new Color3(50, 200, 50);
	const orange = new Color3(255, 150, 0);
	const days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const now = new Date();

	const today = days[now.getDay()];
	const hour = now.getHours();
	const minute = now.getMinutes();

	const isLocationOpen = (location) => {
		let isNearClosing = false;
		let isOpen = false;
		let closingTime;
		let topic;

		for (const time of location.times) {
			if (!time.days.includes(today)) {
				continue;
			}

			const startHour = Number.parseInt(time.start.split(":")[0], 10);
			const startMinute = Number.parseInt(time.start.split(":")[1], 10);
			const endHour = Number.parseInt(time.end.split(":")[0], 10);
			const endMinute = Number.parseInt(time.end.split(":")[1], 10);
			if (
				(hour > startHour || (hour === startHour && minute >= startMinute)) &&
				(hour < endHour || (hour === endHour && minute < endMinute))
			) {
				isOpen = true;
				topic = time.topic;

				const minutesUntilClosing =
					(endHour - hour) * 60 + (endMinute - minute);
				if (minutesUntilClosing < 30) {
					isNearClosing = true;
					closingTime = `${endHour > 12 ? endHour - 12 : endHour}:${String(endMinute).padStart(2, "0")}`;
				}
			}
		}

		return {
			topic,
			isOpen,
			closingTime,
			isNearClosing,
		};
	};

	const getNextOpenTime = (location) => {
		const { topic } = isLocationOpen(location);

		for (const time of location.times) {
			if (!time.days.includes(today) || time.topic === topic) {
				continue;
			}

			const startHour = Number.parseInt(time.start.split(":")[0], 10);
			const startMinute = Number.parseInt(time.start.split(":")[1], 10);
			if (startHour > hour || (startHour === hour && startMinute > minute)) {
				return {
					nextTopic: time.topic,
					nextStartTime: `${startHour > 12 ? startHour - 12 : startHour}:${String(startMinute).padStart(2, "0")}`,
				};
			}
		}

		return {};
	};

	let currentLocation = new Vector3();

	if (USE_LOCATION) {
		try {
			Location.setAccuracyToBest();
			const { latitude, longitude } = await Location.current();
			currentLocation = new Vector3(latitude, longitude, 0);

			// Haversine formula (returns km)
			const getDistance = (v1, v2) => {
				const radiusOfEarth = 6371; // Radius of the Earth in km
				const deltaLat = (v2.x - v1.x) * (Math.PI / 180);
				const deltaLon = (v2.y - v1.y) * (Math.PI / 180);
				const a =
					Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
					Math.cos(v1.x * (Math.PI / 180)) *
						Math.cos(v2.x * (Math.PI / 180)) *
						Math.sin(deltaLon / 2) *
						Math.sin(deltaLon / 2);
				const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
				return radiusOfEarth * c;
			};

			locations.sort((a, b) => {
				const coordsA = new Vector3(a.coords.lat, a.coords.lon, 0);
				const coordsB = new Vector3(b.coords.lat, b.coords.lon, 0);

				a.distance =
					getDistance(currentLocation, coordsA) *
					(USE_LOCATION === "metric" ? 1 : KM_TO_MI);
				b.distance =
					getDistance(currentLocation, coordsB) *
					(USE_LOCATION === "metric" ? 1 : KM_TO_MI);

				return a.distance - b.distance;
			});
		} catch (err) {
			console.warn(`Failed to get location. ${err}`);
		}
	}

	locations.sort((a, b) => {
		const { isOpen: isOpenA } = isLocationOpen(a);
		const { isOpen: isOpenB } = isLocationOpen(b);

		if (isOpenA && !isOpenB) {
			return -1;
		} else if (!isOpenA && isOpenB) {
			return 1;
		}

		return 0;
	});

	for (const location of locations) {
		let { isOpen, isNearClosing, closingTime, topic } =
			isLocationOpen(location);
		const { nextTopic, nextStartTime } = getNextOpenTime(location);
		const distance = location.distance
			? `(${location.distance.toFixed(2)} ${USE_LOCATION === "metric" ? "km" : "mi"})`
			: "";
		let status = isNearClosing
			? `Closes at ${closingTime}`
			: isOpen
				? "OPEN"
				: "CLOSED";

		if (isNearClosing && nextStartTime === closingTime) {
			status = `${nextTopic} at ${nextStartTime}`;
		}

		topic = isOpen
			? `${topic}, `
			: nextTopic
				? `${nextTopic} at ${nextStartTime}, `
				: "";

		const stack = body.addStack(location.name);
		stack.horizontal();

		const locationLabel = stack.addLabel(
			"LocationLabel",
			location.name.replace("Servery", ""),
		);
		locationLabel.font = Font.lightSystemFont(FONT_SIZE);

		const distanceLabel = stack.addLabel("DistanceLabel", distance);
		distanceLabel.font = Font.lightSystemFont(FONT_SIZE);
		distanceLabel.color = new Color3(125, 125, 125);

		stack.addSpacer();

		const topicLabel = stack.addLabel("TopicLabel", topic);
		topicLabel.font = Font.lightSystemFont(FONT_SIZE);

		const statusLabel = stack.addLabel("StatusLabel", status);
		statusLabel.font = Font.mediumSystemFont(FONT_SIZE);
		statusLabel.color = isNearClosing ? orange : isOpen ? green : red;
	}

	body.addFooter(
		`Updated at ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })}`,
	);

	if (King._VERSION !== version) {
		body.addFooter("Please update this widget by tapping it!");
		body.object.url = "https://github.com/jacossaurus/whooos-open";
	}

	await widget.show("Medium", true);
}

await init();

Script.complete();
