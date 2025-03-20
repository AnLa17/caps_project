function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
    } else {
        console.error(`Kein Modal gefunden mit der ID: ${modalId}`);
    }
};

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
    } else {
        console.error(`Kein Modal gefunden mit der ID: ${modalId}`);
    }
};

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Verhindert das Neuladen der Seite

    const formData = new FormData(this); // Holt die Daten aus dem Formular
    const response = await fetch('/register', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        document.getElementById('registerSuccess').style.display = 'block';
        document.getElementById('registerError').style.display = 'none';
        closeModal('registerModal'); // Schließe das Popup
    } else {
        document.getElementById('registerSuccess').style.display = 'none';
        document.getElementById('registerError').style.display = 'block';
    }
});


