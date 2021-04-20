const first_name = "김이박최강고윤엄한배성백전황서천방지마피".split('');
const last_name = "건성현욱정민현주희진영래주동혜도모영진선재현호시우인성마무병별솔하라".split("");
const alpha = "abcdefghijklmnopqrstuvwxyz".split("");
const address = "서울,수원,인천,안양,성남,오산,춘천,원주,철원,영월,양양,속초,동해,강릉,대관령,충주,추풍령,천안,서산,금산,대전,전주,익산,목포,해남,광주,여수,완도,벌교,김천,대구,울릉도,왜관,안동,포항,의성,울진,진해,부산,울산,밀양,마산,창원,통영,진주,제주,북제주,서귀포".split(",");

let idx = 0;
let temp = "";

// 무작위 이름
const getRandomName = repeatNumber => {
  const full_name = [];
  temp = "";

  for (let i = 0; i < repeatNumber; i++) {
    // first_name의 랜덤인덱스 구하기
    idx = Math.floor(Math.random() * first_name.length);

    // 랜덤 first_name
    temp += first_name[idx];

    // 랜덤 last_name
    for (let j = 0; j < 2; j++) {
      idx = Math.floor(Math.random() * last_name.length);
      temp += last_name[idx];
    }

    full_name.push(temp);
    temp = "";
  }

  return full_name;
}

// 무작위 폰번호
const getRandomPhoneNumber = repeatNumber => {
  const phoneNumbers = [];
  temp = "";

  for (let n = 0; n < repeatNumber; n++) {
    temp = "010-";
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 4; j++) {
        idx = Math.floor(Math.random() * 9);
        temp += idx;
      }
      if (i === 0) {
        temp += "-";
      }
    }
    phoneNumbers.push(temp);
    temp = "";
  }

  return phoneNumbers;
}

// 무작위 이메일
const getRandomEmail = repeatNumber => {
  const emails = [];
  temp = "";

  for (let n = 0; n < repeatNumber; n++) {
    for (let i = 0; i < Math.floor(Math.random() * 6 + 6); i++) {
      idx = Math.floor(Math.random() * alpha.length);
      temp += alpha[idx];
    }
    temp += "@naver.com";

    emails.push(temp);
    temp = "";
  }

  return emails
}

// 무작위 생일
const getRandomBirth = repeatNumber => {
  const births = [];
  temp = "";
  const years = Array(20).fill().map((v, i) => i + 1990);
  const months = Array(12).fill().map((v, i) => i + 1);
  const days = Array(31).fill().map((v, i) => i + 1);

  for (let n = 0; n < repeatNumber; n++) {
    // 년
    idx = Math.floor(Math.random() * years.length);
    temp += years[idx] + '-';

    // 월
    idx = Math.floor(Math.random() * months.length);
    if(months[idx] >= 10){
      temp += months[idx] + '-';
    } else {
      temp += '0' + months[idx] + '-';
    }
    
    // 일
    idx = Math.floor(Math.random() * days.length);
    if(days[idx] >= 10){
      temp += days[idx];
    } else {
      temp += '0' + days[idx];
    }

    births.push(temp);
    temp = "";
  }

  return births;
}

// 무작위 지역
const getRandomAddress = repeatNumber => {
  const addresses = [];
  temp = "";

  for (let n = 0; n < repeatNumber; n++) {
    idx = Math.floor(Math.random() * address.length);

    temp = address[idx];

    addresses.push(temp);
    temp = "";
  }

  return addresses;
}

// 이름, 폰번호, 이메일, 생일, 지역순으로 무작위
const getRandomData = repeatNumber => {
  const names = getRandomName(repeatNumber);
  const phoneNumbers = getRandomPhoneNumber(repeatNumber);
  const emails = getRandomEmail(repeatNumber);
  const births = getRandomBirth(repeatNumber);
  const addresses = getRandomAddress(repeatNumber);
  const datas = [];
  let data = [];

  for(let i = 0; i< repeatNumber; i++){
    data.push(names[i]);
    data.push(phoneNumbers[i]);
    data.push(emails[i]);
    data.push(births[i]);
    data.push(addresses[i]);

    datas.push(data);
    data = [];
  }

  return datas;
}


module.exports = {
  getRandomName,
  getRandomPhoneNumber,
  getRandomEmail,
  getRandomBirth,
  getRandomAddress,
  getRandomData
}