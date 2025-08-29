const DEFAULT_LOCATIONS = {
	data: {
		version: King._VERSION,
		locations: [
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
		],
	},
};

module.exports = DEFAULT_LOCATIONS;
