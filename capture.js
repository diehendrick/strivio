/* ===== STRIVIO — Screen Capture Module ===== */
/* Capture app screens and export to Figma */

const Capture = window.__strivio_capture = {
  config: {
    figmaApiKey: null,
    figmaFileKey: null,
    captureQuality: 2,
    defaultFileName: 'strivio-screenshot'
  },

  state: {
    capturedScreens: [],
    isCapturing: false
  },

  // Initialize capture module
  init(options = {}) {
    Object.assign(this.config, options);
    this.createCaptureUI();
    console.log('[Capture] Module initialized');
  },

  // Create floating capture button
  createCaptureUI() {
    const container = document.createElement('div');
    container.id = 'captureWidget';
    container.innerHTML = `
      <style>
        #captureWidget {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .capture-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          transition: transform 150ms ease, box-shadow 150ms ease;
        }
        .capture-btn:hover {
          transform: scale(1.08);
          box-shadow: 0 6px 16px rgba(0,0,0,0.2);
        }
        .capture-btn:active {
          transform: scale(0.95);
        }
        .capture-btn-main {
          background: linear-gradient(135deg, #0056D8, #5B58E0);
        }
        .capture-btn-main iconify-icon {
          color: white;
          font-size: 22px;
        }
        .capture-menu {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: white;
          padding: 10px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12);
        }
        .capture-menu.show {
          display: flex;
          animation: menuSlide 200ms ease-out;
        }
        @keyframes menuSlide {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .capture-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border: none;
          background: #F5F6FA;
          border-radius: 8px;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1A1D26;
          transition: background 100ms;
          white-space: nowrap;
        }
        .capture-menu-btn:hover {
          background: #E8EDF5;
        }
        .capture-menu-btn iconify-icon {
          font-size: 18px;
        }
        .capture-toast {
          position: fixed;
          bottom: 80px;
          right: 20px;
          padding: 12px 16px;
          background: #10B981;
          color: white;
          border-radius: 10px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
          transform: translateY(20px);
          opacity: 0;
          transition: all 200ms ease;
          z-index: 10000;
        }
        .capture-toast.show {
          transform: translateY(0);
          opacity: 1;
        }
        .capture-toast.error {
          background: #EF4444;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }
      </style>
      <div class="capture-menu" id="captureMenu">
        <button class="capture-menu-btn" onclick="Capture.captureCurrentScreen()">
          <iconify-icon icon="solar:camera-bold-duotone" style="color:#0056D8"></iconify-icon>
          Capture Screen
        </button>
        <button class="capture-menu-btn" onclick="Capture.captureAllScreens()">
          <iconify-icon icon="solar:gallery-bold-duotone" style="color:#10B981"></iconify-icon>
          Capture All Screens
        </button>
        <button class="capture-menu-btn" onclick="Capture.downloadCapture()">
          <iconify-icon icon="solar:download-bold-duotone" style="color:#3B82F6"></iconify-icon>
          Download Last Capture
        </button>
        <button class="capture-menu-btn" onclick="Capture.pushToFigma()">
          <iconify-icon icon="solar:figma-bold-duotone" style="color:#F59E0B"></iconify-icon>
          Push to Figma
        </button>
      </div>
      <button class="capture-btn capture-btn-main" onclick="Capture.toggleMenu()" title="Capture Tools">
        <iconify-icon icon="solar:camera-bold-duotone"></iconify-icon>
      </button>
    `;
    document.body.appendChild(container);
  },

  toggleMenu() {
    const menu = document.getElementById('captureMenu');
    menu.classList.toggle('show');
  },

  // Show toast notification
  showToast(message, isError = false) {
    const existing = document.querySelector('.capture-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `capture-toast ${isError ? 'error' : ''}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 200);
    }, 2500);
  },

  // Capture current screen using html2canvas
  async captureCurrentScreen() {
    if (this.state.isCapturing) return;
    this.state.isCapturing = true;
    this.toggleMenu();

    try {
      const phoneFrame = document.querySelector('.phone-frame');
      if (!phoneFrame) throw new Error('Phone frame not found');

      // Dynamically load html2canvas if not available
      if (typeof html2canvas === 'undefined') {
        await this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      }

      const canvas = await html2canvas(phoneFrame, {
        scale: this.config.captureQuality,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0D1321',
        logging: false
      });

      const dataUrl = canvas.toDataURL('image/png');
      const currentScreen = window.currentScreen || 'unknown';
      const capture = {
        id: Date.now(),
        screen: currentScreen,
        dataUrl: dataUrl,
        timestamp: new Date().toISOString(),
        width: canvas.width,
        height: canvas.height
      };

      this.state.capturedScreens.push(capture);
      this.showToast(`Captured screen: ${currentScreen}`);
      console.log('[Capture] Screen captured:', capture);

      return capture;
    } catch (error) {
      console.error('[Capture] Error:', error);
      this.showToast(`Capture failed: ${error.message}`, true);
      return null;
    } finally {
      this.state.isCapturing = false;
    }
  },

  // Capture all screens (sequential capture)
  async captureAllScreens() {
    this.toggleMenu();
    const screens = [
      'splash', 'onboarding1', 'onboarding2', 'onboarding3',
      'login', 'register', 'forgot-password', 'welcome',
      'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9',
      'q10', 'q11', 'q12', 'q13', 'q14', 'q15',
      'conflicts', 'coach', 'loading', 'reveal', 'home'
    ];

    this.showToast(`Starting batch capture (${screens.length} screens)...`);

    for (let i = 0; i < screens.length; i++) {
      const screenId = screens[i];
      console.log(`[Capture] Progress: ${i + 1}/${screens.length} - ${screenId}`);

      // Navigate to screen
      window.navigateTo(screenId);
      await this.delay(300); // Wait for animation

      // Capture
      await this.captureCurrentScreen();
      await this.delay(100);
    }

    this.showToast(`Batch complete: ${this.state.capturedScreens.length} screens captured`);
  },

  // Download the last capture
  downloadCapture() {
    this.toggleMenu();
    const lastCapture = this.state.capturedScreens[this.state.capturedScreens.length - 1];
    if (!lastCapture) {
      this.showToast('No capture available', true);
      return;
    }

    const link = document.createElement('a');
    link.download = `${this.config.defaultFileName}-${lastCapture.screen}-${Date.now()}.png`;
    link.href = lastCapture.dataUrl;
    link.click();

    this.showToast('Download started');
  },

  // Push capture to Figma via MCP
  async pushToFigma() {
    this.toggleMenu();
    const lastCapture = this.state.capturedScreens[this.state.capturedScreens.length - 1];

    if (!lastCapture) {
      this.showToast('No capture available. Capture a screen first.', true);
      return;
    }

    this.showToast('Pushing to Figma...');

    try {
      // Convert data URL to blob for upload
      const response = await fetch(lastCapture.dataUrl);
      const blob = await response.blob();
      const file = new File([blob], `strivio-${lastCapture.screen}.png`, { type: 'image/png' });

      // Store reference for MCP access
      this.state.lastFigmaPush = {
        screen: lastCapture.screen,
        timestamp: new Date().toISOString(),
        file: file
      };

      // Log for MCP pickup
      console.log('[Capture] Ready for Figma MCP push:', {
        screen: lastCapture.screen,
        dimensions: `${lastCapture.width}x${lastCapture.height}`,
        fileSize: `${(blob.size / 1024).toFixed(1)} KB`
      });

      // Trigger download as fallback and signal MCP
      this.showToast('Capture ready! Use Figma MCP to import.');

      // Auto-download for MCP access
      this.downloadCapture();

      return {
        success: true,
        screen: lastCapture.screen,
        dataUrl: lastCapture.dataUrl
      };
    } catch (error) {
      console.error('[Capture] Figma push error:', error);
      this.showToast(`Push failed: ${error.message}`, true);
      return { success: false, error: error.message };
    }
  },

  // Get all captures
  getCaptures() {
    return this.state.capturedScreens;
  },

  // Export captures as JSON manifest
  exportManifest() {
    const manifest = {
      appName: 'Strivio',
      version: '1.0.0',
      capturedAt: new Date().toISOString(),
      totalScreens: this.state.capturedScreens.length,
      screens: this.state.capturedScreens.map(c => ({
        id: c.id,
        screen: c.screen,
        timestamp: c.timestamp,
        dimensions: `${c.width}x${c.height}`
      }))
    };

    const blob = new Blob([JSON.stringify(manifest, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `strivio-capture-manifest.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);

    return manifest;
  },

  // Helper: Load external script
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  },

  // Helper: Delay
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // API: Get capture data for external use (MCP integration)
  getCaptureForFigma(screenId) {
    const capture = screenId
      ? this.state.capturedScreens.find(c => c.screen === screenId)
      : this.state.capturedScreens[this.state.capturedScreens.length - 1];

    if (!capture) return null;

    return {
      screenName: capture.screen,
      imageData: capture.dataUrl,
      dimensions: {
        width: capture.width,
        height: capture.height
      },
      timestamp: capture.timestamp
    };
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize after a short delay to let app load first
  setTimeout(() => {
    Capture.init();
  }, 2000);
});
