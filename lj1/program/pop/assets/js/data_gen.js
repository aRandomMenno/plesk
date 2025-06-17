function generateData() {
    let data = '';
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-={}[]\|:;,.?/~`'";
    let custom_dict = document.getElementById('dictionary').value;
    let num_of_data_strings = parseInt(document.getElementById('num_of_strings').value);
    let data_length = parseInt(document.getElementById('length').value);
    let separator = document.getElementById('separator').value;

    if (custom_dict.length > 0) {
        possible = custom_dict.split('').filter((item, pos, self) => self.indexOf(item) === pos).join('');
    }

    for (let i = 0; i < num_of_data_strings; i++) {
        for (let i = 0; i < data_length; i++) {
            data += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        data += separator;
    }
    document.getElementById('result').innerHTML = data;
}