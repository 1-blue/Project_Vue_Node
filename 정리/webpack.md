###### webpack
#### entry
웹 자원을 변환하기 위한 최초의 진입점
전반적인 파일구조나 내용을 넣어줘야함

#### output
번들링한 결과물의 파일경로
"filename" 옵션으로 결과물의 이름을 지정할 수 있음
[name] : 기존 파일명과 같은이름으로 지정
[hash] : 결과물에 고유의 해쉬값을 붙임
"path" 옵션으로 결과물의 경로를 지정할 수 있음

#### loader
자바스크립트가 아닌 웹자원들을 변환할 때 사용 (css, vue, png 등등)
기본적인 형태
module: {
  rules: [
    {
      test: /\.vue$/,
      use: 'vue-loader'
    }
  ]
}

rules배열내부에 loader를 지정할 파일들과 로더를 적음
test : 로더를 지정할 파일유형 (정규표현식 사용)
use : 사용할 로더를 적음

#### plugin
로더를 적용한 결과물의 형태를 바꿔줌
ex) vue플러그인 적용
plugins: [
  new VueLoaderPlugin(),
],