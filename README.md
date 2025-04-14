<h1 align="center">
  🪑 Tab Bench<br>
  <sub>Group, suspend, and save browser workspaces </sub>
</h1>

<p align="center">
 <a href="https://freeimage.host/i/3lE3RAF"><img src="https://iili.io/3lE3RAF.th.png" alt="3lE3RAF.th.png" border="0"></a>
</p>

---

## ✨ Features
| | |
|---|---|
| **Domain groups** | Instantly see every tab in the current window, grouped by hostname. |
| **One‑click *Sleep/Wake*** | Discard heavy tabs to free RAM, reload them when you need. |
| **Selective workspaces** | Tick just the tabs you want and save them under a custom name. |
| **Local‑only storage** | Everything lives in `chrome.storage.local`. No data ever leaves your browser. |
| **Frosted‑glass UI** | Lightweight vanilla JS & CSS — no frameworks, no bloat. |

---

## 🚀 Install

### From the Chrome Web Store  
> **(coming soon)** — click **Add to Chrome** and you’re done.

### Manual install (dev mode)

1. **Download** the latest release ZIP from [Releases].  
2. Unzip it to any folder.  
3. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the folder.

That’s it — the 🪑 icon appears in your toolbar.

---

## 🕹 Quick Start

| Action | How |
|--------|-----|
| **Group view** | Click the toolbar icon. |
| **Suspend tab** | Hit **Sleep** next to any page. |
| **Wake tab** | Hit **Wake** (appears on discarded tabs). |
| **Create workspace** | Check the boxes of tabs you want → give it a name → **💾 Save**. |
| **Open workspace** | In the list, click **Open** — every URL launches in new tabs. |
| **Delete workspace** | Click **✖** next to its name. |

> Pro‑tip: leave every box unchecked to save *all* tabs in one go.

---

## 🛠 Run locally (hack / contribute)

```bash
git clone https://github.com/your-handle/tab-bench.git
cd tab-bench
# edit files…
# then load the folder via chrome://extensions → Load unpacked
