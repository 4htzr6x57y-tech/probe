import { recommendFrequency } from "./frequency.js";
import { calcCylindricalCoil } from "./coil_cyl.js";
import { calcRectCoil } from "./coil_rect.js";
import { estimateTurns } from "./reverse_calc.js";
import { round } from "./utils.js";

/* -----------------------------
   1. 周波数推奨（探傷ナビ）
------------------------------*/
window.runFrequencyCalc = function () {
    const depth = Number(document.getElementById("depth").value);
    const material = document.getElementById("material").value;

    if (!depth || depth <= 0) {
        document.getElementById("freqResult").textContent = "入力エラー";
        return;
    }

    const freq = recommendFrequency(depth, material);
    document.getElementById("freqResult").textContent = round(freq, 2) + " kHz";
};


/* -----------------------------
   2. 円筒コイル計算
------------------------------*/
window.runCylCalc = function () {
    const d = Number(document.getElementById("cylDiameter").value);
    const l = Number(document.getElementById("cylLength").value);
    const n = Number(document.getElementById("cylTurns").value);

    if (!d || !l || !n || d <= 0 || l <= 0 || n <= 0) {
        document.getElementById("cylL").textContent = "入力エラー";
        return;
    }

    const L = calcCylindricalCoil(d, l, n);
    document.getElementById("cylL").textContent = round(L, 3);
};


/* -----------------------------
   3. 長方形コイル計算
------------------------------*/
window.runRectCalc = function () {
    const a = Number(document.getElementById("rectA").value);
    const b = Number(document.getElementById("rectB").value);
    const n = Number(document.getElementById("rectTurns").value);

    if (!a || !b || !n || a <= 0 || b <= 0 || n <= 0) {
        document.getElementById("rectL").textContent = "入力エラー";
        return;
    }

    const L = calcRectCoil(a, b, n);
    document.getElementById("rectL").textContent = round(L, 3);
};


/* -----------------------------
   4. 実測逆算（巻き数推定）
------------------------------*/
window.runReverseCalc = function () {
    const Lm = Number(document.getElementById("measL").value);
    const d = Number(document.getElementById("measDiameter").value);
    const l = Number(document.getElementById("measLength").value);

    if (!Lm || !d || !l || Lm <= 0 || d <= 0 || l <= 0) {
        document.getElementById("revTurns").textContent = "入力エラー";
        return;
    }

    const turns = estimateTurns(Lm, d, l);
    document.getElementById("revTurns").textContent = round(turns, 1);
};
