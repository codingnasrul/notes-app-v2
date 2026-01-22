import "../styles/style.css";
import "./components/app-bar.js";
import "./components/note-input.js";
import "./components/note-item.js";
import "./components/note-list.js";
import "./components/loading-indicator.js";
import NotesApi from "./data/api.js";
import Swal from "sweetalert2";
import anime from "animejs";

document.addEventListener("DOMContentLoaded", () => {
  const noteListElement = document.getElementById("mainNoteList");
  const archivedListElement = document.getElementById("archivedNoteList");
  const loadingElement = document.querySelector("loading-indicator");

  const showLoading = () => {
    if (loadingElement) loadingElement.show();
  };

  const hideLoading = () => {
    if (loadingElement) loadingElement.hide();
  };

  const fetchNotes = async () => {
    showLoading();
    try {
      console.log("Memulai pengambilan data dari API...");
      const [notes, archived] = await Promise.all([
        NotesApi.getAllNotes(),
        NotesApi.getArchivedNotes(),
      ]);

      console.log("Data berhasil diambil:", { notes, archived });
      if (noteListElement) {
        noteListElement.notes = notes;
      }
      if (archivedListElement) {
        archivedListElement.notes = archived;
      }

      anime({
        targets: ".note-card",
        translateY: [30, 0],
        opacity: [0, 1],
        delay: anime.stagger(100),
        easing: "easeOutQuart",
        duration: 800,
      });
    } catch (error) {
      console.error("Fetch Error:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal Memuat Data",
        text: "Pastikan koneksi internet aktif: " + error.message,
      });
    } finally {
      hideLoading();
    }
  };

  document.addEventListener("save-note", async (event) => {
    showLoading();
    try {
      const { title, body } = event.detail;
      await NotesApi.createNote({ title, body });
      await fetchNotes();

      Swal.fire({
        icon: "success",
        title: "Tersimpan!",
        text: "Catatan baru berhasil ditambahkan ke server.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal Menyimpan",
        text: error.message,
      });
    } finally {
      hideLoading();
    }
  });

  document.addEventListener("delete-note", async (event) => {
    const { id } = event.detail;
    const result = await Swal.fire({
      title: "Hapus Catatan?",
      text: "Tindakan ini tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      showLoading();
      try {
        await NotesApi.deleteNote(id);
        await fetchNotes();
      } catch (error) {
        Swal.fire("Error", error.message, "error");
      } finally {
        hideLoading();
      }
    }
  });

  document.addEventListener("toggle-archive", async (event) => {
    const { id, isArchived } = event.detail;
    showLoading();
    try {
      if (isArchived) {
        await NotesApi.unarchiveNote(id);
      } else {
        await NotesApi.archiveNote(id);
      }

      await fetchNotes();
    } catch (error) {
      Swal.fire("Gagal", error.message, "error");
    } finally {
      hideLoading();
    }
  });

  fetchNotes();
});
