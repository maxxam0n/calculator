const numerBtn = document.querySelectorAll('.number');
const output = document.querySelector('.calculator__output');
const options = document.querySelectorAll('.options');
const operations = document.querySelectorAll('.operations');

let operands = [];
let isOperation = false;
let operation = null;

function clear() {
	operations.forEach(el => el.classList.remove('active'));
	isOperation = false;
	operation = null;
	operands = [];
}

function addOperation(el) {
	isOperation = true;
	operation = el.textContent;
	el.classList.add('active');
	operands.push(Number(output.textContent));
}

function calc() {
	console.log(operands);
	let result;
	if (operation == '/') {
		result = operands[0] / operands[1];
	}
	if (operation == 'x') {
		result = operands[0] * operands[1];
	}
	if (operation == '-') {
		result = operands[0] - operands[1];
	}
	if (operation == '+') {
		result = operands[0] + operands[1];
	}

	console.log(result);

	if (String(result % 1).length > 4) {
		result = result.toFixed(4);
	}
	if (String(result).length < 9) {
		output.textContent = result;
	}
	if (String(result).length >= 9) {
		output.textContent = Number(result).toExponential();
	}

	clear();
}

numerBtn.forEach(el => {
	el.addEventListener('click', (e) => {

		if ((output.textContent === '0' || output.textContent === '-0') && el.textContent != '.') {
			output.textContent = el.textContent;
		} else if (!output.textContent.includes('.') && el.textContent == '.' || el.textContent != '.') {
			output.textContent += el.textContent;
		} else return;

		if (isOperation) {
			isOperation = false;
			output.textContent = el.textContent;
		}
	});
});

options.forEach(el => {
	el.addEventListener('click', (e) => {
		if (el.textContent == 'AC') {
			output.textContent = 0;
			clear();
		}
		if (el.textContent == '%') {
			output.textContent /= 100;
		}

		if (el.textContent == '+/-' && output.textContent.includes('-')) {
			output.textContent = `${output.textContent}`;
		}

		if (el.textContent == '+/-' && !output.textContent.includes('-')) {
			output.textContent = `-${output.textContent}`;
		}
	});
});

operations.forEach(el => {
	el.addEventListener('click', function (e) {

		if (operands.length == 0 && el.textContent != '=') {
			addOperation(this);
		}

		else if (isOperation && operands.length == 1 && el.textContent != '=') {
			clear();
			addOperation(this);
		}

		else if (operands.length == 1 && el.textContent != '=') {
			operands.push(Number(output.textContent));
			calc();
			addOperation(this);
		}

		if (operands.length == 1 && el.textContent == '=') {
			operands.push(Number(output.textContent));
			calc();
		}

		console.log(operands);
	});
});
