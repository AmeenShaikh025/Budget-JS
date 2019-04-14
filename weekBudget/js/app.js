//classes

class Budget {
	constructor(budget) {
		this.budget = Number(budget);
		this.budgetLeft = this.budget;
	}

	//substract for budget

	substractFromBudget(amount) {
		return this.budgetLeft -= amount;
	}
}


//Everuything related to html

class HTML {

	//Insert the budget when the user submits it

	insertBudget(amount) {
		console.log(amount);
		//Insertinto html
		budgetTotal.innerHTML = `${amount}`;
		budgetLeft.innerHTML = `${amount}`;
	}

	//displays the message correct or invald
	printMessage(message, className) {
		const messageWrapper = document.createElement('div');
		messageWrapper.classList.add('text-center','alert', className);
		messageWrapper.appendChild(document.createTextNode(message));

		//Insert into html
		document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

		//clear the eroor
		setTimeout(function() {
			document.querySelector('.primary .alert').remove();
			//OR
			/*addExpenseForm.reset();*/
		}, 3000);
	}


	//Display the expesnses from the form into the list
	addExpenseToList(name,amount) {
		const expensesList = document.querySelector('#expenses ul');

		//create a li
		const li = document.createElement('li');
		li.className = "list-group-item d-flex justify-content-between align-items-center";
		//create a template
		li.innerHTML = `
			${name}
			<span class="badge badge-primary badge-pill">${amount}</span>
		`;

		//Insert into html
		expensesList.appendChild(li);

		//reset fields (Ameen)
		document.querySelector('#expense').value = '';
		document.querySelector('#amount').value = '';

	}

	//substract expense amount from budget

	trackBudget(amount) {
		const budgetLeftDollars = budget.substractFromBudget(amount);
		//console.log(budgetLeftDollars);
		budgetLeft.innerHTML = `${budgetLeftDollars}`;


		//check when 20% is spent

		if((budget.budget / 4) > budgetLeftDollars) {

			//add some classe and remove others

			budgetLeft.parentElement.parentElement.classList.remove('alert-success','alert-warning');
			budgetLeft.parentElement.parentElement.classList.add('alert-danger');

			//check gfor 25%
		} else if((budget.budget / 2) > budgetLeftDollars) {
			budgetLeft.parentElement.parentElement.classList.remove('alert-success');
			budgetLeft.parentElement.parentElement.classList.add('alert-warning');
		}
	}

}


//Variables

const addExpenseForm = document.querySelector('#add-expense'),
		budgetTotal = document.querySelector('span#total'),
		budgetLeft = document.querySelector('span#left');
	


let budget, userBudget;
//instatite budget class
	html = new HTML();

//Event Listeners
eventListeners();

function eventListeners() {

	//Appinit
	document.addEventListener('DOMContentLoaded', function() {
		//ask the vistior for budget
		userBudget = prompt('What\'s your budget for this week?');
		
		//validate user budget
		if(userBudget === null || userBudget === '' || userBudget === '0') {
			window.location.reload();
		} else {
			//Budget is valid - Instatiate the class

			budget = new Budget(userBudget);

			/*console.log(budget);*/

			//Instantiate the new class
			html.insertBudget(budget.budget);
		}

	});


	//when a new expense is added
	addExpenseForm.addEventListener('submit', function() {
		/*e.preventDefault();*/

		//read the values for form
		const expenseName = document.querySelector('#expense').value;
		const amount = document.querySelector('#amount').value;


		if(expenseName === '' || amount === '') {
			//console.log('Invalid');
			html.printMessage('There was an error,all the fields are mandatory','alert-danger');
		}
		else {
			//console.log('valid');
			//add the expenses into the list
			html.addExpenseToList(expenseName, amount);

			html.trackBudget(amount);

			html.printMessage('Added','alert-success');
		}


	});


}


