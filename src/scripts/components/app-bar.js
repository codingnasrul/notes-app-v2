class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <header style="
          background: var(--primary-color);
          color: white;
          padding: 1.5rem;
          text-align: center;
          box-shadow: var(--shadow);
          margin-bottom: 2rem;
          border-radius: 0 0 20px 20px;
      ">
          <h1 style="font-size: 1.8rem; font-weight: 700;">My Notes App</h1>
      </header>
    `;
  }
}

customElements.define("app-bar", AppBar);
