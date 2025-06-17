document.addEventListener('DOMContentLoaded', function () {
	const hamburgerIcon = document.querySelector('.hamburger-icon');
	const headerLinks = document.querySelector('.header-links');
	const navElement = document.querySelector('nav');

	hamburgerIcon.addEventListener('click', function () {
		this.classList.toggle('active');
		document.body.classList.toggle('menu-open');
		headerLinks.classList.toggle('active');

		if (this.classList.contains('active')) {
			navElement.style.visibility = 'hidden';
		} else {
			setTimeout(() => {
				navElement.style.visibility = 'visible';
			}, 400);
		}
	});

	const navDropdownToggle = document.querySelector('.nav-dropdown-toggle');
	const navLinks = document.querySelector('.nav-links');

	navDropdownToggle.addEventListener('click', function () {
		this.classList.toggle('active');
		navLinks.classList.toggle('active');
	});

	document.addEventListener('click', function (event) {
		if (!event.target.closest('.hamburger-menu') && !event.target.closest('.header-links')) {
			hamburgerIcon.classList.remove('active');
			headerLinks.classList.remove('active');
			document.body.classList.remove('menu-open');
			navElement.style.visibility = 'visible';
		}

		if (!event.target.closest('.nav-dropdown-toggle') && !event.target.closest('.nav-links')) {
			navDropdownToggle.classList.remove('active');
			navLinks.classList.remove('active');
		}
	});

	window.addEventListener('resize', function () {
		if (window.innerWidth > 800) {
			hamburgerIcon.classList.remove('active');
			headerLinks.classList.remove('active');
			document.body.classList.remove('menu-open');
			navDropdownToggle.classList.remove('active');
			navLinks.classList.remove('active');
			navElement.style.visibility = 'visible';
		}
	});
});
