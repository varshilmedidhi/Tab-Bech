const tabGroupsEl = document.getElementById("tabGroups");
const refreshBtn = document.getElementById("refreshBtn");
const saveWsBtn = document.getElementById("saveWs");
const wsNameInput = document.getElementById("wsName");
const wsListEl = document.getElementById("wsList");
const selCountLbl = document.getElementById("selCount");

let tabCache = []; // all tabs in current window
let selectedIds = new Set(); // tabId set

/* ---------- Helpers ---------- */
const domainOf = (url) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "unknown";
  }
};

function updateSelLabel() {
  selCountLbl.textContent = selectedIds.size
    ? `${selectedIds.size} Selected`
    : "All";
}

/* ---------- Load & render open tabs ---------- */
async function renderTabs() {
  tabGroupsEl.innerHTML = "";
  selectedIds.clear();
  updateSelLabel();

  tabCache = await chrome.tabs.query({ currentWindow: true });
  const groups = {};
  tabCache.forEach((t) => {
    const dom = domainOf(t.url);
    (groups[dom] = groups[dom] || []).push(t);
  });

  Object.entries(groups).forEach(([domain, list]) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "group";
    groupDiv.innerHTML = `<header>${domain} (${list.length})</header>`;

    list.forEach((tab) => {
      const row = document.createElement("div");
      row.className = "tab";

      /* --- checkbox --- */
      const chk = document.createElement("input");
      chk.type = "checkbox";
      chk.onchange = (e) => {
        e.target.checked ? selectedIds.add(tab.id) : selectedIds.delete(tab.id);
        updateSelLabel();
      };

      /* --- title + suspend button --- */
      const titleSpan = document.createElement("span");
      titleSpan.textContent = tab.title.slice(0, 28);
      titleSpan.title = tab.title;

      const btn = document.createElement("button");
      btn.textContent = tab.discarded ? "Wake" : "Sleep";
      btn.onclick = () => {
        if (tab.discarded) chrome.tabs.reload(tab.id);
        else chrome.tabs.discard(tab.id);
        setTimeout(renderTabs, 300);
      };

      row.append(chk, titleSpan, btn);
      groupDiv.appendChild(row);
    });

    tabGroupsEl.appendChild(groupDiv);
  });
}

/* ---------- Workspace save / load ---------- */
const renderWorkspaces = (list) => {
  wsListEl.innerHTML = "";
  list.forEach((ws, idx) => {
    const row = document.createElement("div");
    row.className = "ws-item";
    row.textContent = ws.name;

    const open = Object.assign(document.createElement("button"), {
      textContent: "Open",
    });
    open.onclick = () => ws.urls.forEach((url) => chrome.tabs.create({ url }));

    const del = Object.assign(document.createElement("button"), {
      textContent: "✖",
    });
    del.onclick = () => {
      list.splice(idx, 1);
      chrome.storage.local.set({ tb_workspaces: list }, () =>
        renderWorkspaces(list)
      );
    };

    row.append(open, del);
    wsListEl.appendChild(row);
  });
};

const loadWorkspaces = () =>
  chrome.storage.local.get("tb_workspaces", ({ tb_workspaces = [] }) =>
    renderWorkspaces(tb_workspaces)
  );

saveWsBtn.onclick = () => {
  const name = wsNameInput.value.trim() || `Workspace ${Date.now()}`;
  const urls = selectedIds.size
    ? tabCache.filter((t) => selectedIds.has(t.id)).map((t) => t.url)
    : tabCache.map((t) => t.url);

  chrome.storage.local.get("tb_workspaces", ({ tb_workspaces = [] }) => {
    tb_workspaces.unshift({ name, urls });
    chrome.storage.local.set({ tb_workspaces }, () => {
      wsNameInput.value = "";
      selectedIds.clear();
      updateSelLabel();
      renderWorkspaces(tb_workspaces);
    });
  });
};

/* ---------- Init ---------- */
refreshBtn.onclick = renderTabs;
renderTabs();
loadWorkspaces();
