const certTypes = [
  '재직증명',
  '재직증명(영문)',
  '경력증명',
  '경력증명(영문)',
  '원천징수영수증',
  '갑종근로소득납세필증명'
];

const certCounts = Array(certTypes.length).fill(0);

$('td').each(function () {
  const td = $(this);

  certTypes.forEach(function (certName, index) {
    // td 안의 span에 텍스트가 있는지 확인
    const span = td.find('span');
    if (span.length && span.text().trim() === certName) {
      // 같은 td 안에 select가 있는 경우
      const select = td.find('select.editor_slt');
      if (select.length > 0) {
        const val = parseInt(select.val(), 10);
        if (!isNaN(val)) {
          certCounts[index] = val;
        }
      }

      // 또는 체크박스가 체크되었는지 확인
      const checkbox = td.find('input[type="checkbox"]');
      if (checkbox.length && checkbox.is(':checked')) {
        certCounts[index] = 1; // 체크됐을 때 1로 표시
      }
    }
  });
});

console.log(certCounts);
