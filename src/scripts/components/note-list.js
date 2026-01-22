class NoteList extends HTMLElement {
  set notes(data) {
    this._notes = data;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="notes-container" style="
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
      "></div>
    `;
    const container = this.querySelector(".notes-container");

    if (this._notes && this._notes.length > 0) {
      this._notes.forEach((note) => {
        const noteItem = document.createElement("note-item");
        noteItem.setAttribute("note-id", note.id);
        noteItem.setAttribute("title", note.title);
        noteItem.setAttribute("body", note.body);
        noteItem.setAttribute("date", note.createdAt);
        noteItem.setAttribute("is-archived", note.archived);
        container.appendChild(noteItem);
      });
    } else {
      container.innerHTML = `
        <p style="
          color: var(--text-muted); 
          grid-column: 1/-1; 
          text-align: center; 
          padding: 2rem;
        ">Tidak ada catatan.</p>
     `;
    }
  }
}
customElements.define("note-list", NoteList);
