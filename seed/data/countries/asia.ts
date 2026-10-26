import { int, pick } from '../../rng'
import { floor, housenumber, mixed, towers, unit, type Country } from '../country'

const asia = { approximate: 0.2, letWhileForSale: 0.02, energy: 'none', homes: towers } as const

export const asiaCountries: Record<string, Country> = {
  JP: {
    ...asia, currency: 'JPY', domain: 'co.jp', perM2: 600000, priceToRent: 22, forSale: 0.5,
    phone: { office: '+81 #-####-####', mobile: '+81 90-####-####' },
    postal: '{p}-####',
    address: (street, rand, flat) => `${street}${int(rand, 1, 7)}丁目${int(rand, 1, 30)}-${int(rand, 1, 20)}${flat ? ` ${unit(rand, 15)}号室` : ''}`,
    agencies: [{ first: [['さくら', 'sakura'], ['あおば', 'aoba'], ['ひかり', 'hikari'], ['みなと', 'minato']], second: [['不動産', 'fudosan'], ['住宅販売', 'jutaku'], ['ハウジング', 'housing']], joined: '' }],
    agents: [{ first: ['美咲', '健太', '陽菜', '翔太', 'さくら', '大輔'], last: ['渡辺', '佐藤', '鈴木', '高橋', '田中', '伊藤'], familyFirst: true }],
    lines: ['駅徒歩5分、日当たり良好です。', 'ペット相談可 🐾'],
  },
  KR: {
    ...asia, currency: 'KRW', domain: 'co.kr', perM2: 7000000, priceToRent: 25, forSale: 0.5,
    phone: { office: '+82 ##-###-####', mobile: '+82 10-####-####' },
    postal: '{p}###',
    address: (street, rand, flat) => `${street} ${housenumber(rand)}${flat ? `, ${unit(rand, 25)}호` : ''}`,
    agencies: [{ first: [['한빛', 'hanbit'], ['푸른', 'pureun'], ['새봄', 'saebom'], ['다온', 'daon']], second: [['공인중개사', 'realty'], ['부동산', 'budongsan']], joined: '' }],
    agents: [{ first: ['서연', '민준', '지우', '하준', '수아', '도윤'], last: ['김', '이', '박', '최', '정', '강'], familyFirst: true, joined: '' }],
    lines: ['역세권, 남향 아파트입니다.'],
  },
  TW: {
    ...asia, currency: 'TWD', domain: 'com.tw', perM2: 300000, priceToRent: 35, forSale: 0.55,
    phone: { office: '+886 # ####-####', mobile: '+886 9##-###-###' },
    postal: '{p}###',
    address: (street, rand, flat) => `${street}${housenumber(rand)}號${flat ? `${floor(rand, 20)}樓` : ''}`,
    agencies: [{ first: [['晴光', 'qingguang'], ['和平', 'heping'], ['宏福', 'hongfu']], second: [['房屋', 'realty'], ['不動產', 'estate']], joined: '' }],
    agents: [{ first: ['志明', '淑芬', '家豪', '怡君', '冠宇'], last: ['陳', '林', '黃', '張', '李'], familyFirst: true, joined: '' }],
    lines: ['近捷運站，生活機能佳。'],
  },
  HK: {
    ...asia, currency: 'HKD', domain: 'com.hk', perM2: 150000, priceToRent: 30, forSale: 0.55, approximate: 0.1,
    phone: { office: '+852 2### ####', mobile: '+852 9### ####' },
    postal: null,
    address: (street, rand, flat) => `${street}${housenumber(rand)}號${flat ? ` ${floor(rand, 40)}樓${pick(rand, ['A', 'B', 'C', 'D'])}室` : ''}`,
    agencies: [{ first: [['港島', 'island'], ['九龍', 'kowloon'], ['維港', 'harbour']], second: [['地產', 'property'], ['置業', 'realty']], joined: '' }],
    agents: [{ first: ['嘉欣', '偉文', '詠詩', '家樂', '美玲'], last: ['陳', '黃', '李', '梁', '何'], familyFirst: true, joined: '' }],
    lines: ['近港鐵站，開揚景觀。'],
  },
  IN: {
    ...asia, currency: 'INR', domain: 'co.in', perM2: 80000, priceToRent: 30, forSale: 0.6, homes: mixed,
    phone: { office: '+91 ## #### ####', mobile: '+91 9#### #####' },
    postal: '{p}###',
    address: (street, rand, flat) => `${flat ? `${pick(rand, ['Flat', 'फ्लैट'])} ${unit(rand, 20)}, ` : ''}${housenumber(rand)}, ${street}`,
    agencies: [
      { first: [['श्री', 'shri'], ['गंगा', 'ganga'], ['सुख', 'sukh']], second: [['प्रॉपर्टीज़', 'properties'], ['रियल्टी', 'realty'], ['आवास', 'awas']] },
      { first: ['Sai', 'Lotus', 'Banyan', 'Monsoon'], second: ['Realty', 'Homes', 'Estates'] },
    ],
    agents: [
      { first: ['प्रिया', 'अनन्या', 'विक्रम', 'राहुल', 'सुनीता'], last: ['शर्मा', 'पटेल', 'गुप्ता', 'वर्मा', 'जोशी'] },
      { first: ['Rahul', 'Arjun', 'Lakshmi', 'Kavya', 'Farhan'], last: ['Iyer', 'Reddy', 'Menon', 'Khan', 'D’Souza'] },
    ],
    lines: ['मेट्रो स्टेशन के पास, 24 घंटे सुरक्षा।', 'Vastu-compliant, east-facing. 🙏'],
  },
  TH: {
    ...asia, currency: 'THB', domain: 'co.th', perM2: 70000, priceToRent: 22, forSale: 0.55,
    phone: { office: '+66 2 ### ####', mobile: '+66 8# ### ####' },
    postal: '{p}##',
    address: (street, rand, flat) => `${housenumber(rand)} ${street}${flat ? ` ห้อง ${unit(rand, 30)}` : ''}`,
    agencies: [{ first: [['บ้านสวย', 'baansuay'], ['สยาม', 'siam'], ['ล้านนา', 'lanna']], second: [['เรียลเอสเตท', 'realestate'], ['พร็อพเพอร์ตี้', 'property']], joined: ' ' }],
    agents: [{ first: ['สมชาย', 'กัญญา', 'ณัฐพล', 'ปวีณา', 'ธนากร'], last: ['ศรีสุข', 'วงศ์ไทย', 'แก้วมณี', 'บุญมา', 'ทองดี'] }],
    lines: ['ใกล้รถไฟฟ้า BTS เดินทางสะดวก', 'วิวสระว่ายน้ำ 🏊'],
  },
  VN: {
    ...asia, currency: 'VND', domain: 'com.vn', perM2: 60000000, priceToRent: 25, forSale: 0.6,
    phone: { office: '+84 24 #### ####', mobile: '+84 9## ### ###' },
    postal: '{p}###',
    address: (street, rand, flat) => `Số ${housenumber(rand)} ${street}${flat ? `, Căn hộ ${unit(rand, 30)}` : ''}`,
    agencies: [{ first: ['Bất động sản', 'Nhà Đất'], second: ['Hồ Gươm', 'Sông Hàn', 'Sài Gòn Xanh', 'Phú Quý'] }],
    agents: [{ first: ['Thị Thu Hằng', 'Văn Đức', 'Ngọc Ánh', 'Quốc Bảo', 'Thị Mỹ Linh'], last: ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Đặng'], familyFirst: true }],
    lines: ['Gần chợ và trường học, sổ hồng chính chủ.'],
  },
}
