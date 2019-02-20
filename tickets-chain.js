/**
 * Receives list of tickets as array, prints source and distination. 
 * Algorithm complexity: O(2*n)
 * @param {Array<String>} ticketsStringArray - tickets as array of stings in "source-destination" format
 */
function ticketsFromTo(ticketsStringArray) {
	const tickets = [];
	const cities = new Map(); // Key added only once is the source or the destination
	let source, destination;

	for (let i = 0; i < ticketsStringArray.length; i++) {
		const [city1, city2] = ticketsStringArray[i].split('-');
		// Save city counts as Map
		let count = cities.get(city1) || 0;
		cities.set(city1, count + 1)
		count = cities.get(city2) || 0;
		cities.set(city2, count + 1)
		// Save tickets as Objects
		tickets.push({ from: city1, to: city2 });
	}

	tickets.forEach(ticket => {
		if (cities.get(ticket.from) < 2) source = ticket;
		if (cities.get(ticket.to) < 2) destination = ticket;
	});
	console.log('Traveling from %s to %s', source.from, destination.to);
}

/**
 * Receives list of tickets as array, prints source and distination. 
 * Algorithm complexity: O(n+m) 
 * @param {Array<String>} ticketsStringArray - tickets as array of stings in "source-destination" format
 */
function ticketsFromTo2(ticketsStringArray) {
	const sources = [];
	const cities = new Map(); // Key added only once is the source or the destination

	for (let i = 0; i < ticketsStringArray.length; i++) {
		const [city1, city2] = ticketsStringArray[i].split('-');
		// Map should contain cities that apper only once
		let count = cities.get(city1) || 0;
		if (count < 1) cities.set(city1, count + 1); else cities.delete(city1); // Delete city on second occurrence
		count = cities.get(city2) || 0;
		if (count < 1) cities.set(city2, count + 1); else cities.delete(city2); // Delete city on second occurrence
		// Save every source city to compare later
		sources.push(city1);
	}

	const [[edge1,], [edge2,]] = [...cities]; // Names of the source and the destination
	for (let i = 0; i < sources.length; i++) {
		if (edge1 === sources[i]) {
			console.log('Traveling from %s to %s', edge1, edge2);
			return;
		}
		if (edge2 === sources[i]) {
			console.log('Traveling from %s to %s', edge2, edge1);
			return;
		}
	}
}

/**
 * Returns array of tickets that follows the traveling path. 
 * Algorithm complexity: O(n*log(n)) 
 * @param {Array<String>} ticketsStringArray - tickets as array of stings in "source-destination" format
 * @returns {Array<String>} - tickets as array sorted from source to destination  
 */
function sortTickets(ticketsStringArray) {
	if (ticketsStringArray.length < 2) return ticketsStringArray; // No sorting needed

	const tickets = [];
	const cities = new Map(); // Key added only once is the source or the destination
	let source, destination;

	for (let i = 0; i < ticketsStringArray.length; i++) {
		const [city1, city2] = ticketsStringArray[i].split('-');
		// Save cities as Map
		let count = cities.get(city1) || 0;
		cities.set(city1, count + 1)
		count = cities.get(city2) || 0;
		cities.set(city2, count + 1)
		// Save tickets as Objects
		tickets.push({ index: i, from: city1, to: city2 });
	}
	//console.log(cities);

	tickets.forEach(ticket => {
		let count1 = cities.get(ticket.from);
		let count2 = cities.get(ticket.to);
		if (count1 < 2) {
			// This is a source city, and first ticket in the chain
			ticket.isSource = true;
			ticket.position = 0;
			source = ticket;
		}
		if (count2 < 2) {
			// This is a destination city, and last ticket in the chain
			ticket.isDestination = true;
			ticket.position = tickets.length - 1;
			destination = ticket;
		}
	});
	//console.log(tickets);

	// Make the source ticket first
	if (source.index !== 0) {
		const buffer = tickets[0];
		tickets[0] = source;
		tickets[source.index] = buffer;
	}
	
	let compareWith = source;
	for (let i = 1; i < tickets.length; i++) {
		for (let j = i + 1; j < tickets.length; j++) {
			if (compareWith.to === tickets[j].from) {
				// We found next ticket, move it to i position
				const buffer = tickets[i];
				tickets[i] = tickets[j];
				tickets[j] = buffer;
				break;
			} 
		}
		compareWith = tickets[i];
	}
	//console.log(tickets);

	return tickets.map(ticket => ticket.from + '-' + ticket.to); 
}

/**
 * Test for "ticket" functions
 */
function test() {
	let tickets = [];
	let sortedTickets = [];

	tickets.push('Lviv-Warshaw');
	tickets.push('Prague-Vienna');
	tickets.push('Warshaw-Prague');
	tickets.push('Kyiv-Lviv');
	tickets.push('Kharkiv-Kyiv');

	ticketsFromTo(tickets);
	ticketsFromTo2(tickets);
	console.log('-------------');

	sortedTickets = sortTickets(tickets);
	ticketsFromTo(tickets);
	console.log(sortedTickets);

	tickets = [];
	tickets.push('Warshaw-Lviv');
	tickets.push('Vienna-Prague');
	tickets.push('Prague-Warshaw');
	tickets.push('Lviv-Kyiv');
	tickets.push('Kyiv-Kharkiv');

	sortedTickets = sortTickets(tickets);
	ticketsFromTo(tickets);
	console.log(sortedTickets);

}
test();