<!-- 
 @ Deze pagina is compleet geschreven door AI, in specifiek Claude 3.7 Sonnet.
 @ Dit heb ik gedaan zodat ik makkelijk de server side form validatie kon testen!
-->

<?php

function displayTestForm()
{
    ?>
    <!DOCTYPE html>
    <html lang="nl">

    <head>
        <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon">
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Test Server-side Validaties</title>
        <link rel="stylesheet" href="../../css/dark_mode.css">
        <style>
            body {
                padding: 20px;
            }

            .form-group {
                margin-bottom: 15px;
            }

            .form-group label {
                display: block;
                margin-bottom: 5px;
            }

            .error {
                color: red;
                margin-top: 20px;
                border: 1px solid red;
                padding: 10px;
            }

            .success {
                color: green;
                margin-top: 20px;
                border: 1px solid green;
                padding: 10px;
            }
        </style>
    </head>

    <body>
        <h1>Test Server-side Validaties</h1>

        <?php if (isset($_GET['error'])) { ?>
            <div class="error">
                <?php echo htmlspecialchars($_GET['error']); ?>
            </div>
        <?php } ?>

        <?php if (isset($_GET['success'])) { ?>
            <div class="success">
                <?php echo htmlspecialchars($_GET['success']); ?>
            </div>
        <?php } ?>

        <form id="userForm" action="index_process.php" method="post" novalidate>
            <p>
                <label for="name">Wat is je naam?: </label>
                <input type="text" name="name" id="name" required>
            </p>
            <p>
                <label for="age">Wat is je leeftijd?: </label>
                <input type="number" name="age" id="age" required min="1" max="100">
            </p>
            <p>
                <label for="email">Wat is je E-mailadres?: </label>
                <input type="email" name="email" id="email" required>
            </p>
            <p>
                <label for="tel">Wat is je telefoon nummer?: </label>
                <input type="tel" name="tel" id="tel" required pattern="^[0-9+\s\-()]{10,15}$">
            </p>
            <p>
                <label for="date">Wat je geboortedatum?:</label>
                <input type="date" name="date" id="date" required>
            </p>
            <p>
                <label for="password">Stel een wachtwoord in:</label>
                <input type="password" name="password" id="password" required minlength="12"
                    pattern="^(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[^A-Za-z0-9].*[^A-Za-z0-9]).{12,}$"
                    title="Password must be at least 12 characters long and contain at least 2 uppercase letters, 2 numbers, and 2 special characters">
            </p>
            <p>
                <label for="bio">Stel een biografie in: (min 100 woorden)</label><br>
                <textarea name="bio" id="bio" cols="50" rows="5" required></textarea>
            </p>
            <p>
                <input type="submit" name="submit" value="verzenden">
            </p>
        </form>

        <h2>Test Cases</h2>
        <ul>
            <li><a href="" onclick="testValidData(); return false;">Test: Geldige gegevens.</a></li>
            <li><a href="" onclick="testMissingName(); return false;">Test: Missing name.</a></li>
            <li><a href="" onclick="testMissingAge(); return false;">Test: Missing age.</a></li>
            <li><a href="" onclick="testMissingEmail(); return false;">Test: Missing email.</a></li>
            <li><a href="" onclick="testMissingPhone(); return false;">Test: Missing phone number.</a></li>
            <li><a href="" onclick="testMissingBirthday(); return false;">Test: Missing birthday.</a></li>
            <li><a href="" onclick="testMissingPassword(); return false;">Test: Missing password.</a></li>
            <li><a href="" onclick="testMissingBio(); return false;">Test: Missing bio.</a></li>
            <li><a href="" onclick="testInvalidAgeTooHigh(); return false;">Test: Invalid age (too high).</a></li>
            <li><a href="" onclick="testInvalidAgeTooLow(); return false;">Test: Invalid age (too low).</a></li>
            <li><a href="" onclick="testInvalidPhone(); return false;">Test: Invalid phone number.</a></li>
            <li><a href="" onclick="testInvalidBirthday(); return false;">Test: Invalid birthday.</a></li>
            <li><a href="" onclick="testInvalidPasswordMissingReqs(); return false;">Test: Invalid password (missing all
                    requirements).</a></li>
            <li><a href="" onclick="testInvalidPasswordPartial(); return false;">Test: Invalid password (partially meets
                    requirements).</a></li>
            <li><a href="" onclick="testInvalidBio(); return false;">Test: Invalid bio.</a></li>
            <li><a href="" onclick="testAgeBirthdayMismatch(); return false;">Test: Age-birthday mismatch.</a></li>
        </ul>

        <script>
            function fillFormData(data) {
                for (let key in data) {
                    if (document.getElementsByName(key)[0]) {
                        document.getElementsByName(key)[0].value = data[key];
                    }
                }
            }

            function testValidData() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                });
            }

            function testMissingName() {
                fillFormData({
                    name: '',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testMissingAge() {
                fillFormData({
                    name: 'John Doe',
                    age: '',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testMissingEmail() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: '',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testMissingPhone() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testMissingBirthday() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testMissingPassword() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: '',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testMissingBio() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: ''
                });
            }

            function testInvalidAgeTooHigh() {
                fillFormData({
                    name: 'John Doe',
                    age: '101',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1922-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testInvalidAgeTooLow() {
                fillFormData({
                    name: 'John Doe',
                    age: '18',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '2007-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testInvalidPhone() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '123',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testInvalidBirthday() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '2030-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testInvalidPasswordMissingReqs() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'simplepassword',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testInvalidPasswordPartial() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecurePassword1',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                });
            }

            function testInvalidBio() {
                fillFormData({
                    name: 'John Doe',
                    age: '25',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'This bio is too short and does not contain 100 words as required.'
                });
            }

            function testAgeBirthdayMismatch() {
                fillFormData({
                    name: 'John Doe',
                    age: '30',
                    email: 'john.doe@example.com',
                    tel: '+31612345678',
                    date: '1999-01-01',
                    password: 'SecureP@ssw0rd!!',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                });
            }
        </script>

        <p><a href="index.php">Terug naar origineel formulier</a></p>
    </body>

    </html>
    <?php
}

displayTestForm();
?>