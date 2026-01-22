class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["title", "body", "date", "note-id", "is-archived"];
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute("title") || "Tanpa Judul";
    const body = this.getAttribute("body") || "";
    const date = this.getAttribute("date") || "";
    const id = this.getAttribute("note-id");
    const isArchived = this.getAttribute("is-archived") === "true";

    const formattedDate = new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    this.innerHTML = `
      <div class="note-card" style="
          background: var(--card-bg); border-radius: 12px; padding: 1.5rem;
          box-shadow: var(--shadow); border: 1px solid var(--border-color);
          display: flex; flex-direction: column; height: 100%;
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      ">
          <h3 style="color: var(--primary-color); font-weight: 700;">${title}</h3>
          <p style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 1rem;">${formattedDate}</p>
          <p style="font-size: 0.95rem; line-height: 1.6; flex-grow: 1; white-space: pre-wrap;">${body}</p>
          <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border-color); display: flex; gap: 8px; justify-content: flex-end;">
              <button class="archive-btn" style="padding: 8px 12px; font-size: 0.8rem; background: #64748b; color: white; border: none; border-radius: 6px; cursor: pointer;">
                ${isArchived ? "Buka Arsip" : "Arsipkan"}
              </button>
              <button class="delete-btn" style="padding: 8px 12px; font-size: 0.8rem; background: #ef4444; color: white; border: none; border-radius: 6px; cursor: pointer;">Hapus</button>
          </div>
      </div>
    `;

    this.querySelector(".delete-btn").addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("delete-note", { detail: { id } }),
      );
    });

    this.querySelector(".archive-btn").addEventListener("click", () => {
      document.dispatchEvent(
        new CustomEvent("toggle-archive", { detail: { id, isArchived } }),
      );
    });
  }
}
customElements.define("note-item", NoteItem);
