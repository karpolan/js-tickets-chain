/**
 * Receives list of tickets as array, prints source and distination. 
 * Algorithm complexity: O(2*n)
 * @param {Array<String>} ticketsStringArray - tickets as array of stings in "source-destination" format
 */
function printSourceAndDestination(ticketsStringArray) {
	const tickets = [];
	const cities = new Map(); // Key added only once is the source and the destination
	let source, destination;

	for (let i = 0; i < ticketsStringArray.length; i++) {
		let [city1, city2] = ticketsStringArray[i].split('-');		
		// Save cities as Map
		let count = cities.get(city1) || 0;
		cities.set(city1, count + 1)
		count = cities.get(city2) || 0;
		cities.set(city2, count + 1)
		// Save tickets as Objects
		tickets.push({from: city1, to: city2});
	}

	tickets.forEach(ticket => {
		if (cities.get(ticket.from) < 2) source = ticket;
		if (cities.get(ticket.to) < 2) destination = ticket;
	});
	console.log('Traveling from %s to %s', source.from, destination.to);
}



/**
 * Receives list of tickets as array, resorder array of tickets to follow the traveling path
 * Algorithm complexity: O(2*n) 
 * @param {Array<String>} ticketsStringArray - tickets as array of stings in "source-destination" format
 * @returns {Array<String>} - tickets as array sorted from source to destination  
 */
function sortTickets(ticketsStringArray) {
	const tickets = [];
	const cities = new Map(); // Key added only once is the source and the destination
	let source, destination;

	for (let i = 0; i < ticketsStringArray.length; i++) {
		let [city1, city2] = ticketsStringArray[i].split('-');
		
		// Save cities as Map
		let count = cities.get(city1) || 0;
		cities.set(city1, count + 1)
		count = cities.get(city2) || 0;
		cities.set(city2, count + 1)

		// Save tickets as Objects
		tickets.push({from: city1, to: city2});
	}
	console.log(cities);

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
	console.log(tickets);



	let source = 'aaa';
	let destination = 'bbb';

	console.log('Traveling from % to %s', source, destination);
	return //createTicketsList(tickets);
}


function test() {
	let tickets = [];

	tickets.push('Lviv-Warshaw');
	tickets.push('Prague-Vienna');
	tickets.push('Warshaw-Prague');
	tickets.push('Kharkiv-Kyiv');
	tickets.push('Kyiv-Lviv');

	printSourceAndDestination(tickets);

	//arrangeTickets(tickets);
}
test();