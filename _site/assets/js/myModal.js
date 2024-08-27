// Abre el modal
function openModal() {
  var modal = document.getElementById("myModal");
  var img = document.querySelector(".thumbnail");
  var modalImg = document.getElementById("img01");

  modal.style.display = "block";
  modalImg.src = img.src;
}

// Cierra el modal
function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// Maneja el clic fuera del modal para cerrarlo
window.onclick = function(event) {
  var modal = document.getElementById("myModal");
  if (event.target == modal) {
      modal.style.display = "none";
  }
}
