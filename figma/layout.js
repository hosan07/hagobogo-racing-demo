// 의견 취합본_v2 배치 · 제목 · 카테고리 · 헤더 · 화면 + 아래 문구
const H = window.H2F, NS = 'hagobogo';
const L = H.L = H.L || {};
const hex = (h) => { h = h.replace('#', ''); return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 }; };
L.X0 = 2410; L.STEP = 399; L.CATX = 878; L.CATW = 1297;
L.text = (p, str, x, y, o = {}) => { const t = figma.createText(); p.appendChild(t); t.fontName = { family: 'Pretendard', style: o.style || 'Regular' }; t.fontSize = o.size || 28; t.characters = str; t.fills = [{ type: 'SOLID', color: hex(o.color || '#BEC3CA') }]; if (o.lh) t.lineHeight = { unit: 'PERCENT', value: o.lh }; if (o.w) { t.textAutoResize = 'HEIGHT'; t.resize(o.w, t.height); } else t.textAutoResize = 'WIDTH_AND_HEIGHT'; t.x = x; t.y = y; t.name = o.name || str.slice(0, 40); return t; };
L.box = (name, x, y, w, h, fill) => { const f = figma.createFrame(); H.section.appendChild(f); f.name = name; f.x = x; f.y = y; f.resize(w, h); f.fills = [{ type: 'SOLID', color: hex(fill) }]; return f; };
L.clear = () => { H.section.children.slice().forEach((n) => n.remove()); };
L.title = (t1, t2) => { L.text(H.section, t1, L.CATX, 120, { size: 200, style: 'Bold', color: '#FFFFFF', name: '제목 · ' + t1 }); L.text(H.section, t2, L.CATX, 420, { size: 56, color: '#BEC3CA', name: '부제 · ' + t2.slice(0, 30) }); };
L.category = (label, y, h) => { const f = L.box('카테고리 · ' + label.replace(/\n/g, ' '), L.CATX, y, L.CATW, h, '#2E3439'); L.text(f, label, 0, 260, { size: 200, style: 'Bold', color: '#FFFFFF', w: L.CATW, lh: 120 }).textAlignHorizontal = 'CENTER'; return f; };
L.header = (label, x, y, w) => { const f = L.box('헤더 · ' + label, x, y, Math.max(w, 900), 599, '#545F68'); const t = L.text(f, label, 107, 167, { size: 200, style: 'Bold', color: '#FFFFFF' }); if (t.width + 214 > f.width) f.resize(t.width + 214, 599); return f; };
L.caption = (lines, x, y, w, size) => L.text(H.section, lines.map((s) => '• ' + s).join('\n'), x, y, { size: size || 28, w, lh: 140, name: '문구 · ' + (lines[0] || '').slice(0, 30) });
// 보드 하나 그리고 · 배율 · 아래 문구
L.place = async (id, x, y, o = {}) => { const b = H.B.boards[id]; const F = await H.draw(id, Object.assign({ x, y, name: o.name || b.title }, o)); if (o.k && o.k !== 1) F.rescale(o.k); const lines = o.caps || b.caps; let bottom = F.y + F.height; if (lines && lines.length) { const c = L.caption(lines, F.x, bottom + 32, Math.max(375, F.width), o.capSize); bottom = c.y + c.height; } return { F, bottom, right: F.x + F.width }; };
// R03 · T03 상태: 두 번째 실황 알림이 떠 있는 순간 / 골인
L.mid = (c) => { c.state = { t: 0 }; c.renderVals(); const cp = c._caps[1] || c._caps[0]; c.state.t = cp[0] + 0.5; };
L.done = (c) => { c.state = { t: 0 }; c.renderVals(); c.state.t = c._end; };
'layout ok'
