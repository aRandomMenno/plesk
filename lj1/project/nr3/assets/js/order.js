document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('payment-form');

	const inputs = form.querySelectorAll('input[required]');
	inputs.forEach(input => {
		input.addEventListener('blur', function () {
			if (this.value.trim() !== '') {
				this.classList.add('valid');
				this.classList.add('input-valid');
				setTimeout(() => {
					this.classList.remove('input-valid');
				}, 500);
			} else {
				this.classList.remove('valid');
			}
		});
	});

	const postalCodeInput = document.getElementById('postalCode');
	if (postalCodeInput) {
		postalCodeInput.addEventListener('input', function () {
			let value = this.value.replace(/\s/g, '');
			if (value.length > 4) {
				value = value.substring(0, 4) + ' ' + value.substring(4);
			}
			this.value = value.toUpperCase();
		});
	}

	form.addEventListener('submit', function (e) {
		let isValid = true;
		inputs.forEach(input => {
			if (!input.validity.valid) {
				isValid = false;
				input.classList.add('invalid');
				input.classList.add('input-invalid');
				setTimeout(() => {
					input.classList.remove('input-invalid');
				}, 500);
			} else {
				input.classList.remove('invalid');
			}
		});

		if (!isValid) {
			e.preventDefault();
			alert('Controleer of je alle verplichte velden correct hebt ingevuld.');
		} else {
			const submitButton = document.querySelector('.submit-button');
			submitButton.classList.add('success-animation');
		}
	});
	
	const formFields = document.querySelectorAll('.form-field');
	formFields.forEach(field => {
		field.classList.add('form-field-focus');
	});

	const buttons = document.querySelectorAll('.submit-button, .back-button');
	buttons.forEach(button => {
		button.classList.add('click-feedback');
	});
	
	document.querySelector('.submit-button').classList.add('button-hover-effect');
});
