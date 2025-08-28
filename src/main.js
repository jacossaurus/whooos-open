const King = importModule("framework");

const Widget = King.Widget;
const Vector3 = King.Vector3;
const Color3 = King.Color3;
const Gradient = King.Gradient;

const FONT_SIZE = 14;
const USE_LOCATION = args.widgetParameter ?? false;
const KM_TO_MI = 0.621371;

async function init() {
	const widget = new Widget(Gradient.fromBaseColor3(new Color3(0, 32, 91)));
	const body = widget.addStack("Body");
	body.vertical();

	const title = body.addLabel("TitleLabel", "Whoose Open? 🦉");
	title.font = Font.boldSystemFont(16);

	const locations = [
		{
			name: "Baker Servery",
			coords: { lat: 29.7170817, lon: -95.3994398 },
			times: [
				// MONDAY - FRIDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "07:30",
					end: "10:30",
					topic: "Breakfast",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "17:00",
					end: "20:00",
					topic: "Dinner",
				},
				// MONDAY - THURSDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
					start: "20:00",
					end: "22:00",
					topic: "Late Night Dining",
				},
			],
		},
		{
			name: "North Servery",
			coords: { lat: 29.7219126, lon: -95.3967242 },
			times: [
				// MONDAY - FRIDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "07:30",
					end: "10:30",
					topic: "Breakfast",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "10:00",
					end: "11:00",
					topic: "Snack Period",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				// MONDAY - THURSDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
					start: "17:00",
					end: "20:00",
					topic: "Dinner",
				},
				// SUNDAY
				{
					days: ["Sunday"],
					start: "08:00",
					end: "11:00",
					topic: "Breakfast",
				},
				{
					days: ["Sunday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				{
					days: ["Sunday"],
					start: "15:00",
					end: "17:00",
					topic: "Munch",
				},
				{
					days: ["Sunday"],
					start: "17:30",
					end: "20:30",
					topic: "Dinner",
				},
			],
		},
		{
			name: "Seibel Servery",
			coords: { lat: 29.715998, lon: -95.3984725 },
			times: [
				// MONDAY - FRIDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "07:30",
					end: "10:00",
					topic: "Enhanced Breakfast",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "10:00",
					end: "11:00",
					topic: "Snack Period",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				// MONDAY - THURSDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
					start: "17:00",
					end: "20:00",
					topic: "Dinner",
				},
				// SUNDAY
				{
					days: ["Sunday"],
					start: "08:00",
					end: "11:00",
					topic: "Breakfast",
				},
				{
					days: ["Sunday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				{
					days: ["Sunday"],
					start: "15:00",
					end: "17:00",
					topic: "Munch",
				},
				{
					days: ["Sunday"],
					start: "17:30",
					end: "20:30",
					topic: "Dinner",
				},
			],
		},
		{
			name: "South Servery",
			coords: { lat: 29.7152163, lon: -95.4011704 },
			times: [
				// MONDAY - FRIDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "07:30",
					end: "10:30",
					topic: "Breakfast",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "11:30",
					end: "13:30",
					topic: "Lunch",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "14:00",
					end: "16:00",
					topic: "Munch",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "16:00",
					end: "17:00",
					topic: "Snack Period",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "17:30",
					end: "21:00",
					topic: "Extended Dinner",
				},
				// SATURDAY
				{
					days: ["Saturday"],
					start: "08:00",
					end: "11:00",
					topic: "Breakfast",
				},
				{
					days: ["Saturday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				{
					days: ["Saturday"],
					start: "15:00",
					end: "17:00",
					topic: "Munch",
				},
				{
					days: ["Saturday"],
					start: "17:30",
					end: "20:30",
					topic: "Dinner",
				},
			],
		},
		{
			name: "West Servery",
			coords: { lat: 29.7210297, lon: -95.3985383 },
			times: [
				// MONDAY - FRIDAY
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "07:30",
					end: "10:00",
					topic: "Enhanced Breakfast",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "11:30",
					end: "13:30",
					topic: "Lunch",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "14:00",
					end: "16:00",
					topic: "Munch",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "16:00",
					end: "17:00",
					topic: "Snack Period",
				},
				{
					days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
					start: "17:30",
					end: "21:00",
					topic: "Extended Dinner",
				},
				// SATURDAY
				{
					days: ["Saturday"],
					start: "08:00",
					end: "11:00",
					topic: "Breakfast",
				},
				{
					days: ["Saturday"],
					start: "11:30",
					end: "14:00",
					topic: "Lunch",
				},
				{
					days: ["Saturday"],
					start: "15:00",
					end: "17:00",
					topic: "Munch",
				},
				{
					days: ["Saturday"],
					start: "17:30",
					end: "20:30",
					topic: "Dinner",
				},
			],
		},
	];

	const red = new Color3(200, 50, 50);
	const green = new Color3(50, 200, 50);
	const orange = new Color3(255, 150, 0);
	const days = [
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
		"Sunday",
	];
	const now = new Date();

	const today = days[now.getDay() - 1];
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
		const { isOpen, topic } = isLocationOpen(location);
		if (isOpen) {
			return topic;
		}

		for (const time of location.times) {
			if (!time.days.includes(today)) {
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

			console.log("Sorted by location!");
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
		const status = isNearClosing
			? `CLOSES ${closingTime}`
			: isOpen
				? "OPEN"
				: "CLOSED";
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

	widget.addFooter(
		`Last updated at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: true })}`,
	);

	await widget.show("Medium", true);
}

await init();

Script.complete();
