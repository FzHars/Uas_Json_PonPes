let originalData; // Variable to store the original data

        // Fetch data from the REST API
        fetch('https://api-pesantren-indonesia.vercel.app/pesantren/3209.json')
            .then(response => response.json())
            .then(data => {
                // Store the original data
                originalData = [data]; // Wrap the single data object in an array for consistency

                // Process the data and populate the table
                const tableBody = document.querySelector('#pesantrenTable tbody');

                data.forEach((pesantren, index) => {
                    const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${pesantren.nama}</td>
                        <td>${pesantren.alamat}</td>
                        <td>${pesantren.kab_kota.nama}</td>
                        <td>${pesantren.provinsi.nama}</td>
                        <td>${pesantren.kyai}</td>
                    </tr>`;
                    tableBody.innerHTML += row;
                });
                document.getElementById('dataCount').innerText = `Jumlah Data: ${data.length} data`;
            })
            .catch(error => console.error('Error fetching data:', error));

        // Function to filter pesantren based on search input
        function searchPesantren() {
            const input = document.getElementById('searchInput');
            const filter = input.value.toUpperCase();
            const table = document.getElementById('pesantrenTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                const tdId = rows[i].getElementsByTagName('td')[0]; // Index 0 corresponds to the ID column
                const tdNama = rows[i].getElementsByTagName('td')[1]; 
                const tdAlamat = rows[i].getElementsByTagName('td')[2];
                const tdKota = rows[i].getElementsByTagName('td')[3];
                if (tdId || tdNama || tdAlamat || tdKota) {
                    const txtValueId = tdId.textContent || tdId.innerText;
                    const txtValueNama = tdNama.textContent || tdNama.innerText;
                    const txtValueAlamat = tdAlamat.textContent || tdAlamat.innerText;
                    const txtValueKota = tdKota.textContent || tdKota.innerText;
                    if (txtValueId.toUpperCase().indexOf(filter) > -1 || txtValueNama.toUpperCase().indexOf(filter) > -1 || txtValueAlamat.toUpperCase().indexOf(filter) > -1|| txtValueKota.toUpperCase().indexOf(filter) > -1) {
                        rows[i].style.display = '';
                    } else {
                        rows[i].style.display = 'none';
                    }
                }
            }
        }

        // Function to reset the table to its original state
        function resetTable() {
            const table = document.getElementById('pesantrenTable');
            const rows = table.getElementsByTagName('tr');

            for (let i = 0; i < rows.length; i++) {
                rows[i].style.display = ''; // Show all rows
            }

            document.getElementById('searchInput').value = ''; // Clear the search input
        }