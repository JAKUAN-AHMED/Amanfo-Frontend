// Generates a print-ready receipt document for a payment record and triggers a
// browser download. The receipt is a self-contained HTML file that can be opened
// and saved as PDF via the browser's "Print → Save as PDF" dialog.

const ORG_NAME = "Amanfo '97";
const ORG_TAGLINE = 'Prempeh College Class of 1997';

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr || '—';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function buildReceiptHtml(payment) {
  const rows = [
    ['Receipt No.', payment.reference || payment.id],
    ['Senior ID', payment.seniorId],
    ['Member', payment.seniorName],
    ['Contribution Type', payment.type],
    ['Payment Date', formatDate(payment.date)],
    ['Payment Reference', payment.reference || '—'],
  ];

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Receipt ${escapeHtml(payment.reference || payment.id)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color: #1f2937; margin: 0; background: #f3f4f6; }
  .sheet { max-width: 640px; margin: 32px auto; background: #fff; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; }
  .head { background: #14532d; color: #fff; padding: 28px 32px; }
  .head h1 { margin: 0; font-size: 22px; }
  .head p { margin: 4px 0 0; font-size: 13px; opacity: .85; }
  .badge { display: inline-block; margin-top: 14px; background: #facc15; color: #14532d; font-weight: 700; font-size: 12px; padding: 4px 12px; border-radius: 999px; letter-spacing: .04em; text-transform: uppercase; }
  .body { padding: 28px 32px; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  td { padding: 11px 0; border-bottom: 1px solid #f1f5f9; }
  td.label { color: #6b7280; width: 45%; }
  td.value { color: #111827; font-weight: 600; text-align: right; }
  .amount { margin-top: 24px; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 18px 20px; display: flex; align-items: center; justify-content: space-between; }
  .amount .lbl { color: #047857; font-size: 13px; font-weight: 600; }
  .amount .val { color: #065f46; font-size: 26px; font-weight: 800; }
  .notes { margin-top: 20px; font-size: 13px; color: #4b5563; }
  .notes .lbl { color: #6b7280; font-weight: 600; display: block; margin-bottom: 4px; }
  .foot { padding: 20px 32px 28px; font-size: 12px; color: #9ca3af; border-top: 1px solid #f1f5f9; }
  .actions { text-align: center; margin: 0 0 28px; }
  button { background: #14532d; color: #fff; border: 0; padding: 11px 22px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; }
  @media print {
    body { background: #fff; }
    .sheet { border: 0; margin: 0; max-width: none; }
    .actions { display: none; }
  }
</style>
</head>
<body>
  <div class="sheet">
    <div class="head">
      <h1>${escapeHtml(ORG_NAME)}</h1>
      <p>${escapeHtml(ORG_TAGLINE)}</p>
      <span class="badge">Payment Receipt</span>
    </div>
    <div class="body">
      <table>
        ${rows.map(([label, value]) => `<tr><td class="label">${escapeHtml(label)}</td><td class="value">${escapeHtml(value || '—')}</td></tr>`).join('\n        ')}
      </table>
      <div class="amount">
        <span class="lbl">Amount Paid</span>
        <span class="val">${escapeHtml(payment.amount)}</span>
      </div>
      ${payment.notes ? `<div class="notes"><span class="lbl">Notes</span>${escapeHtml(payment.notes)}</div>` : ''}
    </div>
    <div class="foot">
      This is an official receipt issued by the ${escapeHtml(ORG_NAME)} Executive.
      Generated on ${formatDate(new Date().toISOString())}. Keep this for your records.
    </div>
  </div>
  <div class="actions">
    <button onclick="window.print()">Print / Save as PDF</button>
  </div>
</body>
</html>`;
}

export function downloadReceipt(payment) {
  const html = buildReceiptHtml(payment);
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Receipt-${(payment.reference || payment.id).replace(/[^\w-]+/g, '_')}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
