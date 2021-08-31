module.exports = {
	currentYear() {
		const today = new Date();
		return today.getFullYear();
	},

	currentMonth() {
		const date = new Date();

		// MONTHS FORMATION
		const months = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		];

		const month = months[date.getMonth()];

		return month;
	},

	currentDay() {
		const date = new Date();
		const currentDay = date.getDate();

		return currentDay;
	},
};
