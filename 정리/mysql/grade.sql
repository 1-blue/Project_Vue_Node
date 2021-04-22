CREATE TABLE grades(
	id integer not null auto_increment primary key,
    midterm int unsigned not null default 0,
    finalterm int unsigned not null default 0,
    enrollId int,
	constraint foreign key fk_grade_student(enrollId) references enroll(id) on delete restrict
);

insert into grades(midterm, finalterm, enrollId) select floor(rand() * 100), floor(rand() * 100), id from enroll;

-- 과목명 학생명 중간 기말 총점 평균
select sub.name as '과목명', stu.name as '학생명', g.midterm as '중간', g.finalterm as '기말', (g.midterm + g.finalterm) as '총점', ceil((g.midterm + g.finalterm) / 2) as '평균'
	from grades as g inner join enroll as e on g.enrollId = e.id
    inner join subjects sub on e.subjectId = sub.id
	inner join students stu on e.studentId = stu.id;
    
-- 과목명 평균 최고득점자 학생수
select sub.name as '과목명', avg(g.midterm + g.finalterm) / 2 as '평균', count(*) as '총학생수'
	, (select ss.name
		from grades as gg inner join enroll as ee on gg.enrollId = ee.id
        inner join students as ss on ee.studentId = ss.id
        inner join subjects as ssss on ee.subjectId = ssss.id
        where ssss.name = sub.name
        order by (gg.midterm + gg.finalterm) desc limit 1) as 최고득점자
	from grades as g inner join enroll as e on g.enrollId = e.id
    inner join subjects sub on e.subjectId = sub.id
	inner join students stu on e.studentId = stu.id
    group by sub.name;

-- 과목명 학생명 중간 기말 총점 평균
    
select * from students where name ='백병시';
select * from enroll;
select * from grades where enrollId = 1;
select * from subjects where id = 6;

select * from enroll;
select * from subjects;
select * from grades order by midterm;

desc enroll;
desc grades;