class LoadingIndicator extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="loading-overlay" id="loadingOverlay" style="display: none;">
        <div class="spinner"></div>
        <p>Tunggu sebentar...</p>
      </div>
      <style>
        .loading-overlay {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(255, 255, 255, 0.85);
          display: flex; flex-direction: column;
          justify-content: center; align-items: center;
          z-index: 9999;
          backdrop-filter: blur(4px);
        }
        .spinner {
          width: 50px; height: 50px;
          border: 5px solid var(--border-color);
          border-top: 5px solid var(--primary-color);
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      </style>
    `;
  }

  show() {
    this.querySelector("#loadingOverlay").style.display = "flex";
  }

  hide() {
    this.querySelector("#loadingOverlay").style.display = "none";
  }
}
customElements.define("loading-indicator", LoadingIndicator);
