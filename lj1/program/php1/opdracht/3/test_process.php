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

        <form action="index_process.php" method="POST">
            <div class="form-group">
                <label for="name">Naam:</label>
                <input type="text" name="name" id="name">
            </div>

            <div class="form-group">
                <label for="student_number">Studentnummer:</label>
                <input type="text" name="student_number" id="student_number">
            </div>

            <div class="form-group">
                <label for="class">Klas:</label>
                <input type="text" name="class" id="class" value="D">
            </div>

            <h2>Vakken en cijfers</h2>

            <div class="form-group">
                <label for="class_1">Vak 1:</label>
                <input type="text" name="class_1" id="class_1">
                <label for="grade_1">Cijfer 1:</label>
                <input type="text" name="grade_1" id="grade_1">
            </div>

            <div class="form-group">
                <label for="class_2">Vak 2:</label>
                <input type="text" name="class_2" id="class_2">
                <label for="grade_2">Cijfer 2:</label>
                <input type="text" name="grade_2" id="grade_2">
            </div>

            <div class="form-group">
                <label for="class_3">Vak 3:</label>
                <input type="text" name="class_3" id="class_3">
                <label for="grade_3">Cijfer 3:</label>
                <input type="text" name="grade_3" id="grade_3">
            </div>

            <div class="form-group">
                <label for="class_4">Vak 4:</label>
                <input type="text" name="class_4" id="class_4">
                <label for="grade_4">Cijfer 4:</label>
                <input type="text" name="grade_4" id="grade_4">
            </div>

            <div class="form-group">
                <button type="submit" name="submit">Verstuur</button>
            </div>
        </form>

        <h2>Test Cases</h2>
        <ul>
            <li><a href="" onclick="testEmptyForm(); return false;">Test: Leeg formulier</a></li>
            <li><a href="" onclick="testInvalidStudentNumber(); return false;">Test: Ongeldig studentnummer</a></li>
            <li><a href="" onclick="testInvalidClass(); return false;">Test: Ongeldige klas</a></li>
            <li><a href="" onclick="testInvalidGrades(); return false;">Test: Ongeldige cijfers</a></li>
            <li><a href="" onclick="testDuplicateSubjects(); return false;">Test: Dubbele vakken</a></li>
            <li><a href="" onclick="testValidData(); return false;">Test: Geldige gegevens</a></li>
        </ul>

        <script>
            function fillFormData(data) {
                for (let key in data) {
                    if (document.getElementsByName(key)[0]) {
                        document.getElementsByName(key)[0].value = data[key];
                    }
                }
            }

            function testEmptyForm() {
                fillFormData({
                    name: '',
                    student_number: '',
                    class: '',
                    class_1: '',
                    grade_1: '',
                    class_2: '',
                    grade_2: '',
                    class_3: '',
                    grade_3: '',
                    class_4: '',
                    grade_4: ''
                });
            }

            function testInvalidStudentNumber() {
                fillFormData({
                    name: 'Test Student',
                    student_number: '12345',
                    class: 'D1A1',
                    class_1: 'Wiskunde',
                    grade_1: '8.5',
                    class_2: 'Engels',
                    grade_2: '7.0',
                    class_3: 'Natuurkunde',
                    grade_3: '6.5',
                    class_4: 'Biologie',
                    grade_4: '9.0'
                });
            }

            function testInvalidClass() {
                fillFormData({
                    name: 'Test Student',
                    student_number: '123456',
                    class: 'X1A1',
                    class_1: 'Wiskunde',
                    grade_1: '8.5',
                    class_2: 'Engels',
                    grade_2: '7.0',
                    class_3: 'Natuurkunde',
                    grade_3: '6.5',
                    class_4: 'Biologie',
                    grade_4: '9.0'
                });
            }

            function testInvalidGrades() {
                fillFormData({
                    name: 'Test Student',
                    student_number: '123456',
                    class: 'D1A1',
                    class_1: 'Wiskunde',
                    grade_1: '12.5',
                    class_2: 'Engels',
                    grade_2: '7.0',
                    class_3: 'Natuurkunde',
                    grade_3: '6.5',
                    class_4: 'Biologie',
                    grade_4: '9.0'
                });
            }

            function testDuplicateSubjects() {
                fillFormData({
                    name: 'Test Student',
                    student_number: '123456',
                    class: 'D1A1',
                    class_1: 'Wiskunde',
                    grade_1: '8.5',
                    class_2: 'Wiskunde',
                    grade_2: '7.0',
                    class_3: 'Natuurkunde',
                    grade_3: '6.5',
                    class_4: 'Biologie',
                    grade_4: '9.0'
                });
            }

            function testValidData() {
                fillFormData({
                    name: 'Test Student',
                    student_number: '123456',
                    class: 'D1A1',
                    class_1: 'Wiskunde',
                    grade_1: '8.5',
                    class_2: 'Engels',
                    grade_2: '7.0',
                    class_3: 'Natuurkunde',
                    grade_3: '6.5',
                    class_4: 'Biologie',
                    grade_4: '9.0'
                });
            }
        </script>

        <p><a href=".">Terug naar origineel formulier</a></p>
    </body>

    </html>
    <?php
}

displayTestForm();
?>