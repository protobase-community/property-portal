/**
 * The places listings are in, by name and region as their country writes them: the centre a search around it measures
 * from, how many listings it draws relative to the others, the first part of its postal codes, some of its streets and,
 * for a city dearer or cheaper than the rest of its country, its own asking price per m² in the country's currency.
 */
export type PlaceSeed = {
  name: string
  region: string
  country: string
  latitude: number
  longitude: number
  weight: number
  postal: string
  streets: readonly string[]
  perM2?: number
}

type Place = [name: string, region: string, latitude: number, longitude: number, weight: number, postal: string, streets: readonly string[], perM2?: number]

const at = (country: string, rows: Place[]): PlaceSeed[] =>
  rows.map(([name, region, latitude, longitude, weight, postal, streets, perM2]) => ({ name, region, country, latitude, longitude, weight, postal, streets, ...(perM2 === undefined ? {} : { perM2 }) }))

export const places: PlaceSeed[] = [
  ...at('NL', [
    ['Amsterdam', 'Noord-Holland', 52.3676, 4.9041, 6, '10', ['Keizersgracht', 'Prinsengracht', 'Rozengracht', 'Vondelstraat', 'Ferdinand Bolstraat', 'Javastraat'], 7800],
    ['Amstelveen', 'Noord-Holland', 52.3114, 4.8701, 1, '11', ['Amsterdamseweg', 'Keizer Karelweg', 'Van der Hooplaan', 'Bovenkerkerweg'], 6200],
    ['Haarlem', 'Noord-Holland', 52.3874, 4.6462, 2, '20', ['Spaarne', 'Kleine Houtstraat', 'Wagenweg', 'Zijlweg'], 5800],
    ['Zaandam', 'Noord-Holland', 52.4420, 4.8292, 1, '15', ['Westzijde', 'Oostzijde', 'Gedempte Gracht']],
    ['Rotterdam', 'Zuid-Holland', 51.9244, 4.4777, 3, '30', ['Nieuwe Binnenweg', 'Witte de Withstraat', "'s-Gravendijkwal", 'Kralingse Plaslaan'], 4300],
    ['Utrecht', 'Utrecht', 52.0907, 5.1214, 2, '35', ['Oudegracht', 'Nachtegaalstraat', 'Biltstraat', 'Burgemeester Reigerstraat'], 5600],
  ]),
  ...at('ES', [
    ['Madrid', 'Comunidad de Madrid', 40.4168, -3.7038, 5, '28', ['Calle de Serrano', 'Calle de Alcalá', 'Gran Vía', 'Calle de Velázquez', 'Calle de Fuencarral'], 5000],
    ['Barcelona', 'Cataluña', 41.3874, 2.1686, 5, '08', ['Passeig de Gràcia', 'Carrer de Mallorca', 'Carrer de Balmes', 'Carrer de Sant Pere Més Alt', 'Rambla de Catalunya'], 4800],
    ['Badalona', 'Cataluña', 41.4500, 2.2474, 1, '08', ['Carrer de Francesc Layret', 'Avinguda de Martí Pujol', 'Carrer del Mar']],
    ['Sitges', 'Cataluña', 41.2370, 1.8059, 1, '08', ['Carrer de Sant Francesc', 'Passeig de la Ribera', 'Carrer Major'], 4900],
    ['Valencia', 'Comunitat Valenciana', 39.4699, -0.3763, 2, '46', ['Calle de Colón', 'Avenida del Puerto', 'Carrer de Cádiz', 'Gran Vía Marqués del Turia']],
    ['Málaga', 'Andalucía', 36.7213, -4.4214, 2, '29', ['Calle Larios', 'Paseo Marítimo Pablo Ruiz Picasso', 'Calle Carretería', 'Avenida de Andalucía'], 3600],
  ]),
  ...at('DE', [
    ['Berlin', 'Berlin', 52.5200, 13.4050, 5, '10', ['Kastanienallee', 'Oranienstraße', 'Kurfürstendamm', 'Bergmannstraße', 'Schönhauser Allee'], 5800],
    ['München', 'Bayern', 48.1351, 11.5820, 3, '80', ['Leopoldstraße', 'Gärtnerplatz', 'Maximilianstraße', 'Türkenstraße'], 9500],
    ['Köln', 'Nordrhein-Westfalen', 50.9375, 6.9603, 2, '50', ['Ehrenstraße', 'Aachener Straße', 'Severinstraße', 'Zülpicher Straße'], 4800],
  ]),
  ...at('FR', [
    ['Paris', 'Île-de-France', 48.8566, 2.3522, 6, '750', ['rue de la Roquette', 'boulevard Voltaire', 'rue du Faubourg-Saint-Antoine', 'rue des Martyrs', 'avenue de Saint-Ouen'], 10000],
    ['Lyon', 'Auvergne-Rhône-Alpes', 45.7640, 4.8357, 2, '690', ['rue Mercière', 'quai Saint-Vincent', 'cours Vitton', 'rue de la République'], 5000],
    ['Aix-en-Provence', 'Provence-Alpes-Côte d’Azur', 43.5297, 5.4474, 1, '131', ['cours Mirabeau', 'rue d’Italie', 'avenue Victor-Hugo'], 4800],
  ]),
  ...at('GB', [
    ['London', 'England', 51.5072, -0.1276, 6, 'NW3', ['Belsize Park Gardens', 'Haverstock Hill', 'England’s Lane', 'Fitzjohn’s Avenue', 'Queen’s Crescent'], 9000],
    ['Edinburgh', 'Scotland', 55.9533, -3.1883, 2, 'EH9', ['Marchmont Road', 'Warrender Park Road', 'Bruntsfield Place', 'Morningside Road'], 3800],
    ['Manchester', 'England', 53.4808, -2.2426, 2, 'M14', ['Wilmslow Road', 'Burton Road', 'Mauldeth Road', 'Platt Lane']],
    ['Cardiff', 'Wales', 51.4816, -3.1791, 1, 'CF10', ['Cathedral Road', 'City Road', 'Heol y Frenhines', 'Stryd Womanby']],
  ]),
  ...at('IE', [
    ['Dublin', 'Leinster', 53.3498, -6.2603, 3, 'D06', ['Baggot Street', 'Rathmines Road', 'Leeson Street', 'Ranelagh Road', 'Sráid Líosain'], 5500],
    ['Gaillimh', 'Connacht', 53.2707, -9.0568, 1, 'H91', ['Sráid na Siopaí', 'Bóthar na Trá', 'Dominick Street']],
  ]),
  ...at('PT', [
    ['Lisboa', 'Lisboa', 38.7223, -9.1393, 3, '1100', ['Rua Augusta', 'Rua da Prata', 'Avenida da Liberdade', 'Calçada da Glória', 'Travessa do Carmo'], 5500],
    ['Porto', 'Porto', 41.1579, -8.6291, 2, '4050', ['Rua de Santa Catarina', 'Rua das Flores', 'Avenida dos Aliados', 'Rua de Cedofeita'], 4000],
  ]),
  ...at('IT', [
    ['Milano', 'Lombardia', 45.4642, 9.1900, 3, '201', ['Corso Buenos Aires', 'Viale Monza', 'Via Sant’Agostino', 'Corso di Porta Ticinese'], 6000],
    ['Roma', 'Lazio', 41.9028, 12.4964, 3, '001', ['Via dei Coronari', 'Via del Corso', 'Viale di Trastevere', 'Via Ostiense'], 4000],
    ['Napoli', 'Campania', 40.8518, 14.2681, 1, '801', ['Via Toledo', 'Via dei Tribunali', 'Corso Vittorio Emanuele', 'Via Chiaia']],
  ]),
  ...at('PL', [
    ['Kraków', 'Małopolskie', 50.0647, 19.9450, 2, '31', ['Floriańska', 'Grodzka', 'Józefińska', 'Krowoderska'], 16000],
    ['Warszawa', 'Mazowieckie', 52.2297, 21.0122, 3, '00', ['Świętokrzyska', 'Marszałkowska', 'Nowy Świat', 'Mokotowska'], 18000],
    ['Łódź', 'Łódzkie', 51.7592, 19.4560, 1, '90', ['Piotrkowska', 'Gdańska', 'Żeromskiego']],
    ['Gdańsk', 'Pomorskie', 54.3520, 18.6466, 1, '80', ['Długa', 'Mariacka', 'Grunwaldzka'], 15000],
  ]),
  ...at('CZ', [
    ['Praha', 'Hlavní město Praha', 50.0755, 14.4378, 3, '120', ['Vinohradská', 'Národní', 'Žitná', 'Křižíkova', 'Řeznická'], 140000],
    ['Brno', 'Jihomoravský kraj', 49.1951, 16.6068, 1, '602', ['Údolní', 'Masarykova', 'Křenová']],
    ['Plzeň', 'Plzeňský kraj', 49.7384, 13.3736, 1, '301', ['Klatovská třída', 'Americká', 'Štefánikovo nábřeží']],
  ]),
  ...at('SE', [
    ['Stockholm', 'Stockholms län', 59.3293, 18.0686, 3, '118', ['Götgatan', 'Åsögatan', 'Ölandsgatan', 'Odengatan'], 90000],
    ['Göteborg', 'Västra Götalands län', 57.7089, 11.9746, 1, '413', ['Linnégatan', 'Vasagatan', 'Övre Husargatan'], 55000],
    ['Malmö', 'Skåne län', 55.6050, 13.0038, 1, '211', ['Södra Förstadsgatan', 'Möllevångsgatan', 'Davidshallsgatan']],
  ]),
  ...at('DK', [
    ['København', 'Region Hovedstaden', 55.6761, 12.5683, 2, '22', ['Nørrebrogade', 'Vesterbrogade', 'Østerbrogade', 'Ægirsgade', 'Blågårdsgade'], 60000],
    ['Aarhus', 'Region Midtjylland', 56.1629, 10.2039, 1, '80', ['Åboulevarden', 'Søndergade', 'Frederiks Allé']],
  ]),
  ...at('IS', [
    ['Reykjavík', 'Höfuðborgarsvæðið', 64.1466, -21.9426, 1, '101', ['Þingholtsstræti', 'Laugavegur', 'Skólavörðustígur', 'Bárugata', 'Ægisíða'], 850000],
    ['Akureyri', 'Norðurland eystra', 65.6885, -18.1262, 1, '600', ['Hafnarstræti', 'Þórunnarstræti', 'Brekkugata']],
  ]),
  ...at('GR', [
    ['Αθήνα', 'Αττική', 37.9838, 23.7275, 3, '105', ['Οδός Ερμού', 'Οδός Αιόλου', 'Λεωφόρος Συγγρού', 'Οδός Σκουφά'], 3200],
    ['Θεσσαλονίκη', 'Κεντρική Μακεδονία', 40.6401, 22.9444, 1, '546', ['Οδός Τσιμισκή', 'Λεωφόρος Νίκης', 'Οδός Αγίου Δημητρίου']],
  ]),
  ...at('BG', [
    ['София', 'София-град', 42.6977, 23.3219, 2, '10', ['бул. „Витоша“', 'ул. „Шипка“', 'ул. „Граф Игнатиев“', 'бул. „Васил Левски“'], 2600],
    ['Пловдив', 'Пловдив', 42.1354, 24.7453, 1, '40', ['ул. „Княз Александър I“', 'бул. „Христо Ботев“', 'ул. „Гладстон“']],
    ['Варна', 'Варна', 43.2141, 27.9147, 1, '90', ['бул. „Приморски“', 'ул. „Цар Симеон I“', 'бул. „Сливница“'], 1900],
  ]),
  ...at('RS', [
    ['Београд', 'Град Београд', 44.7866, 20.4489, 2, '11', ['Кнез Михаилова', 'Његошева', 'Џорџа Вашингтона', 'Булевар краља Александра'], 350000],
    ['Нови Сад', 'Јужнобачки округ', 45.2671, 19.8335, 1, '21', ['Змај Јовина', 'Булевар ослобођења', 'Дунавска']],
  ]),
  ...at('TR', [
    ['İstanbul', 'İstanbul', 41.0082, 28.9784, 5, '344', ['İstiklal Caddesi', 'Bağdat Caddesi', 'Ihlamur Yolu', 'Moda Caddesi'], 90000],
    ['İzmir', 'İzmir', 38.4237, 27.1428, 2, '352', ['Kıbrıs Şehitleri Caddesi', 'Güzelyalı Caddesi', 'Atatürk Caddesi'], 55000],
    ['Ankara', 'Ankara', 39.9334, 32.8597, 1, '066', ['Atatürk Bulvarı', 'Tunalı Hilmi Caddesi', 'Çiçek Sokak']],
  ]),
  ...at('US', [
    ['New York', 'New York', 40.7128, -74.0060, 6, '100', ['W 87th St', 'Bedford Ave', 'Riverside Dr', 'E 7th St'], 13000],
    ['Austin', 'Texas', 30.2672, -97.7431, 2, '787', ['Congress Ave', 'S Lamar Blvd', 'E Cesar Chavez St'], 4200],
    ['Chicago', 'Illinois', 41.8781, -87.6298, 3, '606', ['N Milwaukee Ave', 'W Armitage Ave', 'N Clark St']],
    ['San Francisco', 'California', 37.7749, -122.4194, 2, '941', ['Valencia St', 'Dolores St', 'Haight St', '24th St'], 11000],
  ]),
  ...at('CA', [
    ['Toronto', 'Ontario', 43.6532, -79.3832, 3, 'M5V', ['Queen Street West', 'Yonge Street', 'Ossington Avenue'], 10000],
    ['Montréal', 'Québec', 45.5019, -73.5674, 3, 'H2X', ['rue Saint-Denis', 'boulevard Saint-Laurent', 'avenue du Mont-Royal Est', 'rue Sainte-Catherine Est']],
    ['Vancouver', 'British Columbia', 49.2827, -123.1207, 2, 'V6B', ['Commercial Drive', 'Robson Street', 'West 4th Avenue'], 12000],
  ]),
  ...at('MX', [
    ['Ciudad de México', 'Ciudad de México', 19.4326, -99.1332, 4, '067', ['Calle Durango', 'Av. Álvaro Obregón', 'Calle Tonalá', 'Calle Ámsterdam'], 50000],
    ['Guadalajara', 'Jalisco', 20.6597, -103.3496, 1, '446', ['Av. Vallarta', 'Av. Chapultepec', 'Calle Morelos']],
  ]),
  ...at('BR', [
    ['São Paulo', 'São Paulo', -23.5505, -46.6333, 4, '014', ['Rua Oscar Freire', 'Avenida Paulista', 'Rua Augusta', 'Rua da Consolação'], 11000],
    ['Rio de Janeiro', 'Rio de Janeiro', -22.9068, -43.1729, 3, '220', ['Rua Visconde de Pirajá', 'Avenida Atlântica', 'Rua Barata Ribeiro'], 10500],
    ['Florianópolis', 'Santa Catarina', -27.5949, -48.5482, 1, '880', ['Rua João Pessoa', 'Avenida Beira-Mar Norte', 'Rua Lauro Linhares'], 11500],
  ]),
  ...at('AR', [
    ['Buenos Aires', 'Ciudad Autónoma de Buenos Aires', -34.6037, -58.3816, 3, 'C', ['Av. Corrientes', 'Av. Santa Fe', 'Defensa', 'Gorriti', 'Av. Callao'], 2600],
    ['Córdoba', 'Córdoba', -31.4201, -64.1888, 1, 'X', ['Bv. San Juan', 'Av. Hipólito Yrigoyen', 'Obispo Trejo']],
  ]),
  ...at('JP', [
    ['東京', '東京都', 35.6762, 139.6503, 6, '150', ['渋谷区神宮前', '港区南青山', '世田谷区三軒茶屋', '中央区日本橋'], 1300000],
    ['大阪', '大阪府', 34.6937, 135.5023, 3, '530', ['北区天神橋', '中央区心斎橋筋', '西区北堀江'], 700000],
    ['京都', '京都府', 35.0116, 135.7681, 2, '606', ['左京区下鴨', '中京区御幸町', '東山区祇園町'], 650000],
    ['札幌', '北海道', 43.0618, 141.3545, 1, '060', ['中央区南3条西', '北区北18条西'], 450000],
  ]),
  ...at('KR', [
    ['서울', '서울특별시', 37.5665, 126.9780, 4, '03', ['마포구 월드컵로', '강남구 테헤란로', '용산구 이태원로', '종로구 삼청로'], 18000000],
    ['부산', '부산광역시', 35.1796, 129.0756, 2, '48', ['해운대구 해운대해변로', '수영구 광안해변로', '부산진구 서면로']],
  ]),
  ...at('TW', [
    ['臺北市', '臺北市', 25.0330, 121.5654, 3, '106', ['大安區忠孝東路四段', '信義區松仁路', '中山區南京東路二段'], 900000],
    ['高雄市', '高雄市', 22.6273, 120.3014, 1, '801', ['前金區中正四路', '苓雅區四維三路']],
  ]),
  ...at('HK', [
    ['灣仔', '香港島', 22.2783, 114.1747, 2, '', ['軒尼詩道', '莊士敦道', '告士打道']],
    ['旺角', '九龍', 22.3193, 114.1694, 2, '', ['彌敦道', '西洋菜南街', '亞皆老街']],
    ['沙田', '新界', 22.3817, 114.1878, 1, '', ['沙田正街', '大埔道', '沙角街'], 120000],
  ]),
  ...at('IN', [
    ['मुंबई', 'महाराष्ट्र', 19.0760, 72.8777, 4, '400', ['लोखंडवाला रोड', 'Hill Road', 'Linking Road', 'Carter Road'], 250000],
    ['नई दिल्ली', 'दिल्ली', 28.6139, 77.2090, 3, '110', ['कनॉट प्लेस', 'हौज़ ख़ास', 'Lodhi Road', 'Defence Colony'], 150000],
    ['पुणे', 'महाराष्ट्र', 18.5204, 73.8567, 2, '411', ['Koregaon Park Lane 5', 'फ़र्ग्यूसन कॉलेज रोड', 'Baner Road']],
    ['Bengaluru', 'Karnataka', 12.9716, 77.5946, 3, '560', ['100 Feet Road, Indiranagar', 'ಎಂ.ಜಿ. ರಸ್ತೆ', 'Sarjapur Road', 'ಕೋರಮಂಗಲ 5ನೇ ಬ್ಲಾಕ್'], 110000],
  ]),
  ...at('TH', [
    ['กรุงเทพมหานคร', 'กรุงเทพมหานคร', 13.7563, 100.5018, 4, '101', ['ถนนสุขุมวิท', 'ถนนสีลม', 'ถนนพระราม 4', 'ซอยทองหล่อ'], 180000],
    ['เชียงใหม่', 'เชียงใหม่', 18.7883, 98.9853, 1, '502', ['ถนนนิมมานเหมินท์', 'ถนนห้วยแก้ว', 'ถนนท่าแพ']],
    ['ภูเก็ต', 'ภูเก็ต', 7.8804, 98.3923, 1, '830', ['ถนนราษฎร์อุทิศ 200 ปี', 'ถนนถลาง', 'ถนนเทพกระษัตรี'], 110000],
  ]),
  ...at('VN', [
    ['Hà Nội', 'Hà Nội', 21.0278, 105.8342, 3, '11', ['Phố Hàng Bạc', 'Phố Tràng Tiền', 'Phố Đinh Tiên Hoàng', 'Đường Kim Mã'], 110000000],
    ['Thành phố Hồ Chí Minh', 'Thành phố Hồ Chí Minh', 10.8231, 106.6297, 3, '70', ['Đường Nguyễn Huệ', 'Đường Lê Lợi', 'Đường Đồng Khởi', 'Đường Võ Văn Tần'], 120000000],
    ['Đà Nẵng', 'Đà Nẵng', 16.0544, 108.2022, 1, '50', ['Đường Võ Nguyên Giáp', 'Đường Bạch Đằng', 'Đường Trần Phú']],
  ]),
  ...at('AE', [
    ['دبي', 'إمارة دبي', 25.2048, 55.2708, 4, '', ['شارع الشيخ زايد', 'شارع الوصل', 'جميرا بيتش ريزيدنس', 'Al Barsha 1, Street 23'], 20000],
    ['أبوظبي', 'إمارة أبوظبي', 24.4539, 54.3773, 2, '', ['شارع الكورنيش', 'شارع حمدان بن محمد', 'شارع المرور']],
  ]),
  ...at('IL', [
    ['תל אביב-יפו', 'מחוז תל אביב', 32.0853, 34.7818, 3, '643', ['רחוב דיזנגוף', 'שדרות רוטשילד', 'רחוב שינקין', 'שדרות בן גוריון'], 70000],
    ['ירושלים', 'מחוז ירושלים', 31.7683, 35.2137, 2, '914', ['רחוב יפו', 'רחוב הנביאים', 'רחוב עמק רפאים'], 50000],
    ['חיפה', 'מחוז חיפה', 32.7940, 34.9896, 1, '332', ['שדרות הנשיא', 'רחוב הרצל', 'רחוב מסדה']],
  ]),
  ...at('MA', [
    ['الدار البيضاء', 'الدار البيضاء سطات', 33.5731, -7.5898, 2, '20', ['شارع محمد الخامس', 'Boulevard d’Anfa', 'شارع الزرقطوني', 'Rue Ibnou Mounir'], 16000],
    ['مراكش', 'مراكش آسفي', 31.6295, -7.9811, 2, '40', ['Derb Sidi Bouloukat', 'شارع محمد السادس', 'زنقة ابن عائشة', 'Rue de la Liberté'], 13000],
  ]),
  ...at('ZA', [
    ['Cape Town', 'Western Cape', -33.9249, 18.4241, 3, '80', ['Long Street', 'Kloof Street', 'Bree Street', 'Main Road, Sea Point'], 30000],
    ['Johannesburg', 'Gauteng', -26.2041, 28.0473, 2, '21', ['Jan Smuts Avenue', '7th Street, Melville', 'Oxford Road']],
  ]),
  ...at('KE', [
    ['Nairobi', 'Nairobi County', -1.2921, 36.8219, 2, '001', ['Ngong Road', 'Riverside Drive', 'Kindaruma Road', 'Argwings Kodhek Road'], 180000],
    ['Mombasa', 'Mombasa County', -4.0435, 39.6682, 1, '801', ['Nyali Road', 'Moi Avenue', 'Links Road']],
  ]),
  ...at('NG', [
    ['Lagos', 'Lagos State', 6.5244, 3.3792, 3, '101', ['Admiralty Way, Lekki Phase 1', 'Adeola Odeku Street, Victoria Island', 'Àjàsá Street, Ìkòyí', 'Ogunlana Drive, Surulere'], 1500000],
    ['Abuja', 'Federal Capital Territory', 9.0765, 7.3986, 1, '900', ['Aminu Kano Crescent, Wuse 2', 'Gana Street, Maitama', 'Ahmadu Bello Way, Garki'], 1100000],
  ]),
  ...at('AU', [
    ['Sydney', 'New South Wales', -33.8688, 151.2093, 4, '20', ['Oxford Street', 'Crown Street', 'Bondi Road', 'King Street'], 15000],
    ['Melbourne', 'Victoria', -37.8136, 144.9631, 3, '30', ['Brunswick Street', 'Chapel Street', 'Lygon Street', 'Smith Street'], 10000],
    ['Brisbane', 'Queensland', -27.4698, 153.0251, 2, '40', ['Boundary Road', 'Latrobe Terrace', 'Given Terrace'], 8500],
  ]),
  ...at('NZ', [
    ['Auckland', 'Tāmaki Makaurau', -36.8485, 174.7633, 2, '10', ['Ponsonby Road', 'Karangahape Road', 'Dominion Road', 'Ōrākei Road'], 10000],
    ['Wellington', 'Te Whanganui-a-Tara', -41.2865, 174.7762, 1, '60', ['Cuba Street', 'Aro Street', 'Oriental Parade', 'Tinakori Road'], 8500],
    ['Ōtautahi Christchurch', 'Waitaha Canterbury', -43.5321, 172.6362, 1, '80', ['Riccarton Road', 'Colombo Street', 'Papanui Road']],
  ]),
]
