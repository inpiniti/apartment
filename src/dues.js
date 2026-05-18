// 검단 파라곤 입예협 회비 운영 데이터
// 투명한 회비 운영을 위해 사용내역과 동호수별 납부 현황을 공개합니다.

window.DUES_META = {
  monthlyFee: 10000, // 세대당 월 회비
  totalHouseholds: 569,
  startedAt: '2026-05-01',
  lastUpdated: '2026-05-14',
  account: '국민 123-4567-89000 (예금주: 검단파라곤 입예협)',
  manager: '5901동 1701호 김두W',
};

// 사용내역 카테고리 색상 (data.js의 CATEGORY_STYLES와 동일한 체계)
window.DUES_CATEGORY_STYLES = {
  운영: { fg: 'oklch(0.45 0.13 35)', bg: 'oklch(0.96 0.025 35)' },
  인쇄: { fg: 'oklch(0.45 0.13 240)', bg: 'oklch(0.96 0.025 240)' },
  행정: { fg: 'oklch(0.45 0.13 200)', bg: 'oklch(0.96 0.025 200)' },
  자문: { fg: 'oklch(0.45 0.13 340)', bg: 'oklch(0.96 0.025 340)' },
  회의: { fg: 'oklch(0.45 0.13 145)', bg: 'oklch(0.96 0.025 145)' },
  통신: { fg: 'oklch(0.45 0.13 220)', bg: 'oklch(0.96 0.025 220)' },
  현장: { fg: 'oklch(0.45 0.13 15)', bg: 'oklch(0.96 0.025 15)' },
  기타: { fg: 'oklch(0.45 0.13 80)', bg: 'oklch(0.96 0.025 80)' },
  수입: { fg: 'oklch(0.45 0.15 145)', bg: 'oklch(0.96 0.03 145)' },
};

// 사용내역 — 최신 순
window.DUES_TRANSACTIONS = [
  {
    id: 't-26',
    date: '2026-05-13',
    type: 'expense',
    category: '인쇄',
    title: '입예협 정식 출범 안내문 인쇄',
    detail: '569세대 우편 발송용 안내문 A4 컬러 인쇄 600부',
    amount: 132000,
    handler: '5901동 1701호 김두W',
    receipt: true,
    vendor: '검단인쇄소',
  },
  {
    id: 't-25',
    date: '2026-05-13',
    type: 'expense',
    category: '행정',
    title: '정식 출범 등기우편 발송',
    detail: '569세대 등기우편 (위임장 결과 안내)',
    amount: 287595,
    handler: '5901동 1701호 김두W',
    receipt: true,
    vendor: '인천검단우체국',
  },
  {
    id: 't-24',
    date: '2026-05-12',
    type: 'expense',
    category: '자문',
    title: '변호사 사전 자문료 (1차)',
    detail: '우물천장 미시공·설계변경 동의서 법적 검토',
    amount: 550000,
    handler: '5902동 1101호 라마바M',
    receipt: true,
    vendor: '법무법인 ○○ 강○○ 변호사',
  },
  {
    id: 't-23',
    date: '2026-05-11',
    type: 'expense',
    category: '회의',
    title: '운영진 정기 회의 식대',
    detail: '운영진 14인 (사전점검·세대창고 협의 안건)',
    amount: 168000,
    handler: '5907동 2101호 우아W',
    receipt: true,
    vendor: '검단곰탕집',
  },
  {
    id: 't-22',
    date: '2026-05-10',
    type: 'expense',
    category: '운영',
    title: '도면 출력 (A1 컬러 12장)',
    detail: '84A·84B 평면도 + 단지배치도 출력 (회의 자료)',
    amount: 84000,
    handler: '5906동 304호 자바워크M',
    receipt: true,
    vendor: '청라플로터센터',
  },
  {
    id: 't-21',
    date: '2026-05-09',
    type: 'expense',
    category: '통신',
    title: '네이버 카페 프리미엄 1년',
    detail: '대용량 첨부·운영진 권한 관리용',
    amount: 89000,
    handler: '5901동 1701호 김두W',
    receipt: true,
    vendor: '네이버',
  },
  {
    id: 't-20',
    date: '2026-05-09',
    type: 'expense',
    category: '운영',
    title: '사무용품 일괄 구매',
    detail: '파일박스·라벨·USB 32GB·인주·도장집',
    amount: 73400,
    handler: '5907동 2101호 우아W',
    receipt: true,
    vendor: '다이소·쿠팡',
  },
  {
    id: 't-19',
    date: '2026-05-08',
    type: 'expense',
    category: '인쇄',
    title: '완판 축하 현수막 5장',
    detail: '동 입구 게시용 (5901·5903·5905·5906·5907동)',
    amount: 125000,
    handler: '5906동 1604호 푸르른M',
    receipt: true,
    vendor: '검단광고',
  },
  {
    id: 't-18',
    date: '2026-05-07',
    type: 'expense',
    category: '회의',
    title: '사전점검 업체 미팅 (3개사)',
    detail: '업체 비교 미팅 카페 음료 + 미팅룸 대관 4시간',
    amount: 87500,
    handler: '5903동 1204호 우히히M',
    receipt: true,
    vendor: '투썸플레이스 검단점',
  },
  {
    id: 't-17',
    date: '2026-05-06',
    type: 'expense',
    category: '현장',
    title: '공사 현장 답사 교통비',
    detail: '운영진 4인 현장 방문 (드론 점검 사전 답사)',
    amount: 64000,
    handler: '5906동 304호 자바워크M',
    receipt: true,
    vendor: '택시 4건',
  },
  {
    id: 't-16',
    date: '2026-05-05',
    type: 'expense',
    category: '통신',
    title: '단톡방 공지 알림봇 (월)',
    detail: '카카오톡 공지 봇 + SMS 알림 발송',
    amount: 22000,
    handler: '5901동 1701호 김두W',
    receipt: true,
    vendor: '알리고',
  },
  {
    id: 't-15',
    date: '2026-05-04',
    type: 'expense',
    category: '인쇄',
    title: '위임장 인쇄 600부',
    detail: '위임장 양식 인쇄 + 봉투 600매',
    amount: 96000,
    handler: '5901동 1701호 김두W',
    receipt: true,
    vendor: '검단인쇄소',
  },
  {
    id: 't-14',
    date: '2026-05-03',
    type: 'expense',
    category: '운영',
    title: '구글 워크스페이스 1년',
    detail: '운영진 공용 메일·드라이브 5계정',
    amount: 132000,
    handler: '5902동 1101호 라마바M',
    receipt: true,
    vendor: 'Google',
  },
  // 수입 — 회비 일괄 입금
  {
    id: 't-13',
    date: '2026-05-13',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 38건)',
    detail: '계좌이체 자동집계 (5/13 입금분)',
    amount: 380000,
    handler: '자동집계',
    receipt: false,
  },
  {
    id: 't-12',
    date: '2026-05-12',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 67건)',
    detail: '계좌이체 자동집계 (5/12 입금분)',
    amount: 670000,
    handler: '자동집계',
    receipt: false,
  },
  {
    id: 't-11',
    date: '2026-05-11',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 94건)',
    detail: '계좌이체 자동집계 (5/11 입금분)',
    amount: 940000,
    handler: '자동집계',
    receipt: false,
  },
  {
    id: 't-10',
    date: '2026-05-10',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 88건)',
    detail: '계좌이체 자동집계 (5/10 입금분)',
    amount: 880000,
    handler: '자동집계',
    receipt: false,
  },
  {
    id: 't-09',
    date: '2026-05-08',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 121건)',
    detail: '계좌이체 자동집계 (5/8 입금분)',
    amount: 1210000,
    handler: '자동집계',
    receipt: false,
  },
  {
    id: 't-08',
    date: '2026-05-06',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 78건)',
    detail: '계좌이체 자동집계 (5/6 입금분)',
    amount: 780000,
    handler: '자동집계',
    receipt: false,
  },
  {
    id: 't-07',
    date: '2026-05-04',
    type: 'income',
    category: '수입',
    title: '5월 회비 (이체 48건)',
    detail: '계좌이체 자동집계 (5/4 입금분)',
    amount: 480000,
    handler: '자동집계',
    receipt: false,
  },
];

// 동호수별 납부 현황
// 실제 569세대 데이터 시뮬레이션 — 7개동 × 평균 81세대
// 동별로 paid (납부 완료 호수 배열), 미납자만 별도 표시 가능
// 호수: 1xx ~ 22xx, 호 단위 1·2·3·4
const DONG_LAYOUT = [
  { dong: '5901동', floors: 22, units: 4, total: 88 },
  { dong: '5902동', floors: 22, units: 4, total: 88 },
  { dong: '5903동', floors: 22, units: 4, total: 88 },
  { dong: '5904동', floors: 18, units: 4, total: 72 },
  { dong: '5905동', floors: 16, units: 4, total: 64 },
  { dong: '5906동', floors: 22, units: 4, total: 88 },
  { dong: '5907동', floors: 22, units: 4, total: 81 },
];

// 결정론적 시드 기반 미납자 생성 (재현 가능)
function seededRandom(seed) {
  let x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateDongData(dong, floors, units, total, seedBase) {
  const households = [];
  let count = 0;
  for (let f = 1; f <= floors; f++) {
    for (let u = 1; u <= units; u++) {
      if (count >= total) break;
      const hoNum = f * 100 + u;
      const seed = seedBase + f * 10 + u;
      // 약 7~12% 미납률 (동마다 다르게)
      const unpaidThreshold = 0.07 + seededRandom(seedBase) * 0.05;
      const paid = seededRandom(seed) > unpaidThreshold;
      households.push({
        ho: hoNum + '호',
        paid,
        // 납부일 (paid인 경우만)
        paidAt: paid
          ? '2026-05-' +
            String(3 + Math.floor(seededRandom(seed + 1) * 10)).padStart(2, '0')
          : null,
      });
      count++;
    }
    if (count >= total) break;
  }
  return households;
}

window.DUES_PAYMENT_STATUS = DONG_LAYOUT.map((d, i) => {
  const households = generateDongData(
    d.dong,
    d.floors,
    d.units,
    d.total,
    (i + 1) * 137,
  );
  const paidCount = households.filter((h) => h.paid).length;
  return {
    dong: d.dong,
    total: d.total,
    paidCount,
    households,
  };
});

// 총 집계 (전체 헤더에 표시)
const _totalPaid = window.DUES_PAYMENT_STATUS.reduce(
  (s, d) => s + d.paidCount,
  0,
);
const _totalHouseholds = window.DUES_PAYMENT_STATUS.reduce(
  (s, d) => s + d.total,
  0,
);
const _income = window.DUES_TRANSACTIONS.filter(
  (t) => t.type === 'income',
).reduce((s, t) => s + t.amount, 0);
const _expense = window.DUES_TRANSACTIONS.filter(
  (t) => t.type === 'expense',
).reduce((s, t) => s + t.amount, 0);

window.DUES_SUMMARY = {
  income: _income,
  expense: _expense,
  balance: _income - _expense,
  paidCount: _totalPaid,
  totalCount: _totalHouseholds,
  paidRate: _totalPaid / _totalHouseholds,
};
