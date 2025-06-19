const certTypes = [
  '재직증명',
  '재직증명(영문)',
  '경력증명',
  '경력증명(영문)',
  '원천징수영수증',
  '갑종근로소득납세필증명'
];

const certCounts = [];

$('td').each(function () {
  const td = $(this);
  certTypes.forEach(function (certName, index) {
    if (td.text().includes(certName)) {
      const selectEl = td.find('select.editor_slt');
      if (selectEl.length > 0) {
        const val = parseInt(selectEl.val(), 10);
        certCounts[index] = val;
      }
    }
  });
});

console.log(certCounts);  // 예: [1, 0, 2, 0, 1, 0] 형태
