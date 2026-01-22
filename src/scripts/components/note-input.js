class NoteInput extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="input-card">
          <h2>Tambah Catatan Baru</h2>
          <form id="noteForm">
              <div class="form-group">
                  <label for="title">Judul</label>
                  <input type="text" id="title" placeholder="Masukkan judul..." required autocomplete="off">
                  <span class="error-msg" id="titleError">Minimal 3 karakter</span>
              </div>
              <div class="form-group">
                  <label for="body">Isi Catatan</label>
                  <textarea id="body" placeholder="Tulis sesuatu..." rows="5" required></textarea>
                  <span class="error-msg" id="bodyError">Minimal 10 karakter</span>
              </div>
              <button type="submit" id="submitBtn" disabled>Simpan Catatan</button>
          </form>
      </div>
    `;

    this._setupValidation();
  }

  _setupValidation() {
    const form = this.querySelector("#noteForm");
    const titleInput = this.querySelector("#title");
    const bodyInput = this.querySelector("#body");
    const submitBtn = this.querySelector("#submitBtn");

    const validate = () => {
      const isTitleValid = titleInput.value.trim().length >= 3;
      const isBodyValid = bodyInput.value.trim().length >= 10;

      submitBtn.disabled = !(isTitleValid && isBodyValid);

      this.querySelector("#titleError").style.display =
        titleInput.value.length > 0 && !isTitleValid ? "block" : "none";
      this.querySelector("#bodyError").style.display =
        bodyInput.value.length > 0 && !isBodyValid ? "block" : "none";
    };

    titleInput.addEventListener("input", validate);
    bodyInput.addEventListener("input", validate);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const noteData = {
        title: titleInput.value,
        body: bodyInput.value,
      };

      this.dispatchEvent(
        new CustomEvent("save-note", {
          detail: noteData,
          bubbles: true,
          composed: true,
        }),
      );

      form.reset();
      validate();
    });
  }
}

customElements.define("note-input", NoteInput);
