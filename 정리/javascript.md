=================================================================================================
###### Array Method
### 1. array.length
직접 길이 조작이 가능함... 길이를 조작할 경우 for~of문에서 반복횟수가 변함
### 2. array.toString()
배열의 각요소를 ,로 연결된 문자열로 반환
### 3. array.toLocaleString()

### 4. array.pop()
배열의 마지막요소 제거 후 반환
### 5. array.push(...items)
배열의 끝에 새로운 요소 추가 후 배열길이 반환.. (items는 추가할 요소들)
### 6. array.concat(array2)
array끝에 array2를 합쳐서 새로운 배열을 반환
### 7. array.join(separator)
separator를 기준으로 배열의 각 요소를 분리해서 문자열로 반환함 (단 separator가 없을경우 ,를 이용해서 분리함)
### 8. array.reverse()
배열을 반전함 (배열 자체가 변함)
### 9. array.shift()
배열을 첫번째 요소를 제거하고 반환함
### 10. array.slice(start, end)
array[start]이상 array[end]미만의 값을 가진 배열을 리턴함.
### 11. array.sort(func(f, s))
func를 이용해서 배열을 정렬 f가 s보다 작으면 음수값, 같으면 0, 크면 양수값...  func생략시 아스키코드기준오름차순으로 정렬
### 12. array.splice(start, deleteCount, ...items)
start부터 deleteCount만큼 배열의 요소를 제거하고 items를 배열요소로 추가함
### 13. array.unshift(...items)
배열시작부분에 items를 요소로 추가함
### 14. array.indexOf(searchElement, fromIndex)
배열에서 searchElement를 fromIndex부터 찾고 찾은 index값을 반환... (단 fromIndex생략시 0부터시작)
### 15. array.lastIndexOf(searchElement, fromIndex)
indexOf의 역순으로 찾음. (단 fromIndex생략시 array.length-1부터 시작해서 역순으로)
### 16. array.every(callback(value, index, array))
배열의 모든 요소가 callback함수의 리턴값이 true인지 체크하고 하나라도 false인경우 그 즉시 바로 false리턴. (단 빈배열일경우 true리턴)
### 17. array.some(callback(value, index, array))
배열의 하나의 요소라도 callback함수의 리턴값이 true라면 그 즉시 true리턴 아니면 false리턴 (단 빈배열일경우 false리턴)
### 18. array.forEach(callback(value, index, array))
배열의 모든 요소에 대해 callback함수 실행
### 19. array.map(callback(value, index, array))
배열의 각 요소마다 callback을 실행하고 반환값들로 새로운 배열로 만들어서 리턴함
### 20. array.filter(callback(value, index, array))
배열의 각 요소마다 callback을 실행하고 반환값이 true인 요소들을 모아서 새로운 배열을 리턴함
### 21. array.reduce(callback(previousVlue, value, index, arr), initValue)
배열의 각 요소마다 callback을 실행하고 반환값을 previouseValue에 넣음, (initValue는 처음PreviousValue의 값이고 생략시 배열의 첫번째값)
### 22. array.reduceRight(callback(previousVlue, value, index, arr), initValue)
reduce와 작동은 동일하고 배열의 끝부터 시작점까지 역순으로 실행함

=================================================================================================
###### 바닐라 자바스크립트
### .childNodes
자식노드들모두 nodelist로 반환
ex) Array.prototype.slice.call(nodelist) : nodelist모두 배열형태로 반환     // 배열에서 제공되는 api 사용하기위해 변환하는것임

=================================================================================================
###### 



=================================================================================================
###### 



=================================================================================================
###### 