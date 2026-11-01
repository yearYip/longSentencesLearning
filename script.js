let sentences = [];
let mode = "original"; // "original" | "chunks"

const listEl = document.getElementById("sentenceList");
const toggleBtn = document.getElementById("toggleMode");
// const searchInput = document.getElementById("searchInput");

// 加载 JSON
async function loadSentences() {
    const res = await fetch("sentences.json");
    sentences = await res.json();
    render();
}

// 渲染
function render() {
    //   const keyword = searchInput.value.trim().toLowerCase();
    listEl.innerHTML = "";

    sentences
        // .filter(s => !keyword || s.original.toLowerCase().includes(keyword))
        .forEach(s => {
            const card = document.createElement("div");
            card.className = "sentence-card";

            const id = document.createElement("div");
            id.className = "sentence-id";
            id.textContent = `No. ${String(s.id).padStart(3, "0")}`;

            const body = document.createElement("div");
            if (mode === "original") {
                body.className = "original";
                body.textContent = s.original;
            } else {
                body.className = "chunks";
                s.chunks.forEach(c => {
                    const span = document.createElement("span");
                    span.className = "chunk";
                    span.textContent = c;
                    body.appendChild(span);
                });
            }

            card.appendChild(id);
            card.appendChild(body);
            listEl.appendChild(card);
        });
}

// 切换模式
toggleBtn.addEventListener("click", () => {
    mode = mode === "original" ? "chunks" : "original";
    toggleBtn.textContent =
        mode === "original" ? "把句子切碎"
            : "还原句子";
    render();
});

// 搜索
// searchInput.addEventListener("input", render);

loadSentences();