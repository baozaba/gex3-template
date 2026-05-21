function toggleSection(header) {
    const section = header.parentElement;
    const content = section.querySelector('.section-content');
    const isActive = content.classList.contains('active');
    
    document.querySelectorAll('.section-content').forEach(el => {
        el.classList.remove('active');
    });
    document.querySelectorAll('.section-header').forEach(el => {
        el.classList.remove('active');
    });

    if (!isActive) {
        content.classList.add('active');
        header.classList.add('active');
    }
}

function togglePlace(card) {
    card.classList.toggle('selected');
}

function resetAllErrors() {
    document.querySelectorAll('.error-text').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    document.getElementById('globalError').style.display = 'none';
}

function generateItinerary() {
    resetAllErrors();
    let valid = true;

    const fullName = document.getElementById('fullName').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.querySelector('input[name="gender"]:checked');

    if (!fullName) {
        document.getElementById('fullNameError').textContent = "This field is required";
        document.getElementById('fullNameError').style.display = 'block';
        valid = false;
    }
    if (!dob) {
        document.getElementById('dobError').textContent = "This field is required";
        document.getElementById('dobError').style.display = 'block';
        valid = false;
    }
    if (!gender) {
        document.getElementById('genderError').textContent = "Please select gender";
        document.getElementById('genderError').style.display = 'block';
        valid = false;
    }

    const selectedPlaces = document.querySelectorAll('.place-card.selected');
    if (selectedPlaces.length === 0) {
        document.getElementById('parkError').textContent = "Please select at least one place";
        document.getElementById('parkError').style.display = 'block';
        valid = false;
    }

    const totalVisitors = document.getElementById('totalVisitors').value;
    if (!totalVisitors || totalVisitors < 1) {
        document.getElementById('visitorsError').textContent = "This field is required";
        document.getElementById('visitorsError').style.display = 'block';
        valid = false;
    }

    const accommodation = document.getElementById('accommodation').value;
    if (!accommodation) {
        document.getElementById('accommodationError').textContent = "Please select accommodation";
        document.getElementById('accommodationError').style.display = 'block';
        valid = false;
    }

    const cardName = document.getElementById('cardName').value.trim();
    const cardNumber = document.getElementById('cardNumber').value.trim();
    const expDate = document.getElementById('expDate').value;
    const cvc = document.getElementById('cvc').value.trim();

    if (!cardName) {
        document.getElementById('cardNameError').textContent = "This field is required";
        document.getElementById('cardNameError').style.display = 'block';
        valid = false;
    }
    if (!cardNumber) {
        document.getElementById('cardNumberError').textContent = "This field is required";
        document.getElementById('cardNumberError').style.display = 'block';
        valid = false;
    }
    if (!expDate) {
        document.getElementById('expDateError').textContent = "This field is required";
        document.getElementById('expDateError').style.display = 'block';
        valid = false;
    }
    if (!cvc) {
        document.getElementById('cvcError').textContent = "This field is required";
        document.getElementById('cvcError').style.display = 'block';
        valid = false;
    }

    if (!valid) {
        document.getElementById('globalError').style.display = 'block';
        document.getElementById('itineraryOutput').style.display = 'none';
        return;
    }

    document.getElementById('itineraryOutput').style.display = 'block';

    document.getElementById('outputName').textContent = `Name: ${fullName}`;
    document.getElementById('outputGender').textContent = `Gender: ${gender.value}`;
    document.getElementById('outputDob').textContent = `Date of Birth: ${dob}`;

    const placesList = document.getElementById('outputPlaces');
    placesList.innerHTML = '';
    selectedPlaces.forEach(card => {
        const li = document.createElement('li');
        li.textContent = card.querySelector('h4').textContent;
        placesList.appendChild(li);
    });

    document.getElementById('outputTotalVisitors').textContent = `Total Visitors: ${totalVisitors}`;
    document.getElementById('outputChildren').textContent = `Children: ${document.getElementById('children').value || 0}`;
    document.getElementById('outputAccommodation').textContent = `Accommodation: ${accommodation}`;
    document.getElementById('outputCardName').textContent = `Name on Card: ${cardName}`;
    
    const masked = cardNumber.replace(/\d(?=\d{4})/g, '*');
    document.getElementById('outputCardNumber').textContent = `Card Number: ${masked}`;
    document.getElementById('outputExpDate').textContent = `Exp Date: ${expDate}`;
    document.getElementById('outputCvc').textContent = `CVC: Provided`;
}