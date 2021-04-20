[]생략가능
대문자 => 명령어
소문자 => 입력해야할거

###### =================== DB관련 ===================
## DB생성 + (문자열세팅)
CREATE DATABASE 디비명 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
문자설정도 같이하는것
기본적으로 column들은 테이블설정을 따라가고 테이블은 DB설정을 따라가기때문에
애초에 DB에서 문자설정을 해주면 테이블과 column을 설정할필요가 거의 없음

###### =================== 사용자생성 및 권한부여 ===================
#### 1. 사용자생성
use mysql
CREATE user 사용자명[@'host' IDENTIFIED BY '비밀번호'];
사용자명만 적어서 생성하면 기본적으로 모든 host에서 접근가능함
SELECT host, user FROM user; ( <-저걸로 확인가능)

#### 2. 사용자 삭제
drop user 사용자명@'host';

#### 3. 권한부여
GRANT ALL PRIVILEGES ON DB명.테이블명 TO 사용자명@'host' [IDENTIFIED BY '비밀번호']
DB에 해당하는 테이블에만 CRUD권한부여
단 *사용시 모든것에 권한부여됨 (host는 %사용)
ALL대신 select, insert, update, delete등을 사용하면 각각의 권한을 부여할 수 있음

모든 수정사항 변경시마지막으로
flush privileges; 사용해야 적용됨
사용자에게 부여된 권한 확인
SHOW GRANTS FOR 사용자명@'host';

#### 4. 비밀번호 부여 및 변경 및 확인
이유는 모르겠으나 권한부여할 때 비밀번호가 입력이 안되가지고 다른방법을 찾음

현재암호 확인
SELECT host, user, authentication_string FROM user;

비밀번호변경
ALTER user 사용자명@'host' IDENTIFIED WITH mysql_native_password BY '변경할비밀번호';

###### =================== 테이블 및 데이터 관리 ===================
#### 1. 테이블생성
CREATE TABLE 테이블명 ( column정의 );

#### 2. 테이블형태검색
DESC 테이블명

#### 3. 데이터추가
INSERT INTO 테이블명 VALUES( 데이터들 );

#### 4. 데이터수정
UPDATE 테이블명 SET 수정할데이터 WHERE 조건;

#### 5. 특정데이터검색
SELECT * FROM 테이블명 WHERE 조건;
SELECT [distinck] column명 FROM 테이블명;
(distinck) => 중복제거

SELECT * FROM 테이블명 ORDER BY column명 [DESC];
테이블데이터를 지정한 column명으로 오름차순정렬
DESC붙일경우 내림차순 정렬 (큰거 -> 작은거)

#### 6. JOIN
테이블을 합쳐서 보여주는 명령어임
[book]                    |  [author]
id    name    author_id   |    id        name      age
1      bn1        1       |    1          j        21
2      bn2        2       |    2          k        33
3      bn3        1       |    3          h        31
4      bn4        4       |    5          a        55
book과 author라는 테이블이 있다고 가정

SELECT (출력할거) FROM 테이블명 [사용할 join] 테이블명 ON (join의 조건) [WHERE 출력할 row에 대한 조건];
## JOIN-1 LFET JOIN
SELECT * FROM book LEFT JOIN author on book.author_id = author.id; 의 결과는
book의 author_id컬럼에 해당하는 id값과 author에 해당하는 id가 같을경우 author를 붙여서 출력해줌
book.id = 4 처럼 author에 해당하는게 없는경우에는 NULL로 모두채워서 보여줌

## JOIN-2 INNER JOIN
LEFT JOIN과 같은데 해당하는게 없을경우 row를 삭제함

## JOIN-3 OUTER JOIN
LEFT JOIN과 RIGHT JOIN을 합쳐서 출력하고 중복된것은 제거해서 보여줌
이것을 지원하지않는경우가 많아서 굳이하려면 (LEFT JOIN) UNION (RIGHT JOIN)을 해주면됨

#### 7. INSERT SELECT문
INSERT INTO test(name) SELECT name FROM person WHERE id < 5;
person테이블의 id > 5인 name을 가져와서 test테이블의 name에다가 넣어라

###### =================== 테이블수정 ===================
## 테이블구조변경
ALTER TABLE 테이블명 [ENGINE | AUTO_INCREMENT | COMMENT | RENAME]
기본엔진, 시작숫자, 주석, 이름, 변경

## 기본형태
ALTER TABLE 테이블명 [ADD | MODIFY | CHANGE | DROP] COLUMN column명

## 1. column추가
ALTER TABLE 테이블명 ADD column명 ( 데이터정보 타입, not null 등);

## 2. column삭제
ALTER TABLE 테이블명 DROP COLUMN column명

## 3. coulmn 디폴트값 변경
ALTER TABLE 테이블명 ALTER COLUMN column명 set default 디폴트값;

## 4. column 타입 변경
ALTER TABLE 테이블명 MODIFY xx 타입;
(기존에 디폴트값은 사라짐)

## 5. column 위치 변경
ALTER TABLE 테이블명 MODIFY column명 column타입 AFTER 앞에올column명;

## 6. column 이름 변경
ALTER TABLE 테이블명 CHANGE column명 바꿀column명 column타입;

## 7. 테이블비우기
truncate 테이블명;
delete from table 테이블명;
delete 사용시 테이블내부 row들만모두 삭제하는거고
truncate 사용시 기본값들까지 모두 삭제 ( auto_increment의 시작값같은것도 초기화 )

## 8. 테이블정보보기
show table status;

## 9. 테이블 이름 변경
ALTER TABLE 현재이름 RENAME 변경할이름;

## 10. 테이블 백업
create table 백업테이블명 like 백업할테이블명;  ( 명세만 복사됨 )
insert into 백업테이블명 select * from 백업할테이블명;  ( 값까지 복사 )

###### =================== foreign key ===================
다른 테이블과의 연관관계를 표현할 때 사용함
[CONTSTRAINT] foreign key [인덱스명](참조할column) REFERENCES 참조당할테이블(참조당할column) [ON (DELETE | UPDATE) (RESTRICT | CASCADE | SET NULL | NOACTION | SET DEFAULT)]
CONTSTRAINT 생략가능
기본적으로 ON DELETE를 자주사용하므로 DELETE기준으로 설명함
1. RESTRICT : 기본값으로 참조된 데이터가 삭제될경우 에러표시
2. CASCADE : 참조된 데이터가 삭제될경우 같이 삭제
3. SET NULL : 참조된 데이터가 삭제될경우 NULL로 대체
3. NOACTION : 참조된 데이터가 삭제될경우 그냥 그대로 놔둠
3. SET DEFAULT : 참조된 데이터가 삭제될경우 DEFAULT로 대체

###### =================== 함수 ===================
#### 1. 날짜계산함수
SELECT *, TIMESTAMPDIFF(단위, 날짜1, 날짜2) AS 대체할column명 FROM 테이블명;
날짜2 - 날짜1의 단위만큼의 차이를 계산해서 테이블에 As뒤에값의 이름인 column을 붙여서 출력해줌
날짜2는 대부분 CURDATE()사용
CURDATE() => 현재 날짜
단위는 YEAR, MONTH 등등 년도 ~ 초 까지 많이 있음 찾아서 쓰면됨

#### 2. LIKE
SELECT * FROM 테이블명 WHERE name LIKE ('%P%')
1. %p => p로 끝나는거 찾음
2. p% => p로 시작하는거 찾음
3. %p% => p를 포함하는거 찾음
%는 어떤글자던간에 여러글자상관없고
_는 어떤글자던간에 한글자만

## 3. REGEXP__LIKE
정규 표현식과 같은형식으로 사용

## 4. COUNT(*)
SELECT spicies, COUNT(*) FROM 테이블명;
spicies가 각각 몇개인지 개수출력해줌

###### =================== SELECT 조건예시 ===================
## LIKE
-1 WHERE name [NOT] LIKE '%주%';
name에 '주'가 포함되는 사람 모두 찾기

## IN
-2 WHERE name [NOT] IN ('주민성', '배주성');  =>  (name = '주민성' or name = '배주성' 과 같음)
name이 주민성, 배주성인 사람 찾기

## BETWEEN
-3 WHRER id [NOT] BETWEEN 10 and 20;         =>  (id > 10 and id < 20 과 같음)
id가 10~20인 사람 찾기

## DISTINCT
SELECT DISTINCT(name) FROM person WHERE name like '김%';
김씨중에서 동명이인빼고 name찾아서 출력

## COUNT
SELECT COUNT(DISTINCT name) FROM person WHERE name like '김%';
김씨중에서 동명이인빼고 몇명인지 출력

## ORDER BY [RAND()]
SELECT * FROM person ORDER BY name [DESC] [RAND()]
person을 모두 name순 정렬해서 출력
DESC, RAND()는 단어 그대로 해석하면됨

## LIMIT
SELECT * FROM person LIMIT [X], [Y];
X번째부터 Y개 출력
10, 20일경우 PRIMARY KEY순으로 정렬되어 있다면
id = 10 ~ 30이 출력됨

## GROUP BY
SELECT address, count(*) , avg(score) FROM person GROUP BY address;
address를 기준으로 같은 애들은 하나의 그룹으로 묶어서 출력함
( 일반적으로 출력하면 맨처음 하나만 출력되고 count(*)붙이면 각 그룹이 몇개인지 출력됨 )

# [group by에서 조건걸기]
SELECT address, count(*) as cnt , avg(score) FROM person GROUP BY address having cnt > 330;
위같은형식으로 group by의 결과값에 조건을 걸려면 having을 사용하면됨

###### =================== 자료형 ===================
## DATETIME
4바이트짜리 시간
입력된 시간에서 변경사항없음

## TIMESTAMP
8바이트짜리 시간
입력된 시간에서 time_zone에 의존해서 시간이 맞춰짐

## 현재시간 / 업데이트시간
DEFAULT CURRENT_TIMESTAMP [ON UPDATE CURRENT_TIMESTAMP]

생성된 현재시간을 테이블에 넣고
ON UPDATE는 업데이트 될 때 마다 시간을 넣음

###### =================== 추가로 알아야할것 ===================
## 세션아이디보기
기본적으로 DB에 접속하면 DB에서 세션을 하나 생성함
SHOW processlist

## index
책의 목차같은 느낌으로 새로운 저장공간을 하나 만들어서 index들을 정리해둠 ( 메모리에 올라가있으므로 검색속도↑ )
자주 select, join, order by 등의 명령을 내리는 값들에게 index를 부여해주면 속도가 빨라짐

unique는 값이 유일하고 메모리에 올림
fulltext는 자주 검색하는 text일경우 지정
primary는

모두 메모리에 올려둠으로서 검색속도가 빨라짐

###### =================== VIEW ===================
기존에 입력해야할 긴 명령어를 변수에 저장하듯 사용할 수 있음
## 1. view 생성
CREATE VIEW view이름 AS 대신할 명령어;
JOIN같은거 여러번쓰거나 반복적으로 사용할 때 VIEW로 정의해두고 사용하면 편함

[간단예시]
CREATE VIEW str as select * from students where address = '진주';
select * from str;  === ( select * from students where address = '진주');
( 거주지 진주인 학생만 출력해줌 )

## 2. view 삭제
DROP VIEW view이름;